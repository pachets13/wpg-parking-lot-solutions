#!/usr/bin/env node
/**
 * download-images.js
 * Downloads images from Unsplash and saves them into public/assets/images/
 * following the naming conventions in public/assets/NOTES.md.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=your_key node scripts/download-images.js
 *
 * Requires Node 18+ (uses built-in fetch and fs).
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error('Error: UNSPLASH_ACCESS_KEY environment variable is not set.');
  console.error('  Usage: UNSPLASH_ACCESS_KEY=your_key node scripts/download-images.js');
  process.exit(1);
}

// Map: search query → array of target file paths (relative to public/assets/images/)
// Order matters — first result → first filename, second result → second filename.
const DOWNLOADS = [
  {
    query: 'commercial parking lot aerial',
    files: [
      'hero/hero-home.jpg',
      'hero/hero-about.jpg',
    ],
  },
  {
    query: 'snow plow parking lot winter',
    files: [
      'hero/hero-snow-ice.jpg',
      'services/equipment-snow.jpg',
    ],
  },
  {
    query: 'asphalt paving machine',
    files: [
      'hero/hero-concrete-asphalt.jpg',
      'hero/hero-design-build.jpg',
    ],
  },
  {
    query: 'concrete construction commercial',
    files: [
      'services/concrete-detail.jpg',
      'portfolio/project-concrete-01.jpg',
    ],
  },
  {
    query: 'winnipeg winter parking lot',
    files: [
      'services/comparison-before.jpg',
      'services/comparison-after.jpg',
    ],
  },
];

// Trigger an Unsplash download event (required by API terms of service)
async function triggerDownload(downloadUrl) {
  try {
    await fetch(`${downloadUrl}&client_id=${ACCESS_KEY}`);
  } catch {
    // Non-fatal — just a TOS ping
  }
}

async function searchUnsplash(query, count) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&client_id=${ACCESS_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Unsplash API error ${res.status}: ${body}`);
  }
  const data = await res.json();
  return data.results;
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  // Ensure all target directories exist
  const dirs = ['hero', 'services', 'portfolio', 'team'];
  for (const dir of dirs) {
    fs.mkdirSync(path.join(ASSETS_DIR, dir), { recursive: true });
  }

  for (const { query, files } of DOWNLOADS) {
    console.log(`\nSearching: "${query}"`);
    let results;
    try {
      results = await searchUnsplash(query, files.length);
    } catch (err) {
      console.error(`  Failed to search: ${err.message}`);
      continue;
    }

    if (results.length === 0) {
      console.warn(`  No results found.`);
      continue;
    }

    for (let i = 0; i < files.length; i++) {
      const photo = results[i];
      if (!photo) {
        console.warn(`  Result ${i + 1}: no photo returned — skipping ${files[i]}`);
        continue;
      }

      const destPath = path.join(ASSETS_DIR, files[i]);
      // Use the 'full' size for quality; Unsplash serves JPEG by default
      const imageUrl = photo.urls.full;
      const photographer = photo.user.name;
      const unsplashLink = photo.links.html;

      process.stdout.write(`  [${i + 1}] ${files[i]} (by ${photographer}) … `);
      try {
        await downloadFile(imageUrl, destPath);
        await triggerDownload(photo.links.download_location);
        console.log('done');
      } catch (err) {
        console.error(`failed: ${err.message}`);
        continue;
      }

      // Print attribution — required by Unsplash license
      console.log(`       Photo: ${unsplashLink}`);
    }
  }

  console.log('\nAll downloads complete.');
  console.log('Images are in public/assets/images/ and match the names in NOTES.md.');
  console.log('\nUnsplash attribution reminder:');
  console.log('  Free API use requires linking back to each photographer.');
  console.log('  Photographer credit links were printed above for each image.');
}

run().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
