#!/usr/bin/env node
/**
 * download-images-pexels.js
 * Downloads images from Pexels and saves them with project-specific filenames.
 *
 * Usage:
 *   PEXELS_API_KEY=your_key node scripts/download-images-pexels.js
 *
 * Requires Node 18+ (uses built-in fetch and fs).
 *
 * To adapt for a new project: edit the CONFIG block below only.
 * Do not touch anything below the "END CONFIG" line.
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// CONFIG — edit this block for each new project
// =============================================================================

// Where to save downloaded images.
// Path is relative to the location of this script file.
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');

// Subdirectories to create inside OUTPUT_DIR before downloading.
const SUBDIRS = ['hero', 'services', 'portfolio', 'team'];

// Search terms and output filenames.
//   query  — what to search on Pexels
//   files  — output paths relative to OUTPUT_DIR, in result order
//            (first result → first filename, second result → second filename)
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

// =============================================================================
// END CONFIG — do not edit below this line
// =============================================================================

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error('Error: PEXELS_API_KEY environment variable is not set.');
  console.error('  Usage: PEXELS_API_KEY=your_key node scripts/download-images-pexels.js');
  process.exit(1);
}

async function searchPexels(query, count) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Pexels API error ${res.status}: ${body}`);
  }
  const data = await res.json();
  return data.photos;
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
  for (const dir of SUBDIRS) {
    fs.mkdirSync(path.join(OUTPUT_DIR, dir), { recursive: true });
  }

  for (const { query, files } of DOWNLOADS) {
    console.log(`\nSearching: "${query}"`);
    let photos;
    try {
      photos = await searchPexels(query, files.length);
    } catch (err) {
      console.error(`  Failed to search: ${err.message}`);
      continue;
    }

    if (!photos || photos.length === 0) {
      console.warn(`  No results found.`);
      continue;
    }

    for (let i = 0; i < files.length; i++) {
      const photo = photos[i];
      if (!photo) {
        console.warn(`  Result ${i + 1}: no photo returned — skipping ${files[i]}`);
        continue;
      }

      const destPath = path.join(OUTPUT_DIR, files[i]);
      const imageUrl = photo.src.original;
      const photographer = photo.photographer;
      const pexelsLink = photo.url;

      process.stdout.write(`  [${i + 1}] ${files[i]} (by ${photographer}) … `);
      try {
        await downloadFile(imageUrl, destPath);
        console.log('done');
      } catch (err) {
        console.error(`failed: ${err.message}`);
        continue;
      }

      // Print attribution — good practice even though Pexels license doesn't require it
      console.log(`       Photo: ${pexelsLink}`);
    }
  }

  console.log('\nAll downloads complete.');
  console.log(`Images saved to: ${OUTPUT_DIR}`);
}

run().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
