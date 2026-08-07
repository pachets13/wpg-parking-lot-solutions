# WPG Parking Lot Solutions and Concrete

A concept website for a commercial parking lot, concrete, and snow removal contractor, built as an unpaid portfolio project by [Pachet Web Design & Automation](https://www.pachetdigital.ca).

**Live:** https://pachets13.github.io/wpg-parking-lot-solutions/
**Case study:** https://www.pachetdigital.ca/work/wpg-parking-lot-redesign

## About this build

WPG Parking Lot Solutions and Concrete is a fictional company. The project began as a speculative redesign of a real contractor's site, and every identifying detail was replaced before publishing. The name, the phone number `(204) 888-0000`, and the address are invented. Any resemblance to a real business is not intended.

The redesign is built around positioning. The original read like every other trades company in the city, so the rebuild leads with seasonal specialism and gives each service its own space instead of three interchangeable cards.

## Stack

React 18 and Vite, with React Router and react-helmet-async for per-route metadata.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run deploy   # publish dist/ to the gh-pages branch
```

Note that this site publishes from the `gh-pages` branch. Pushing to `main` does not update the live site. Run `npm run deploy`.

## History

This repository carries a single commit by design. The history was squashed to remove the real business details that the earlier commits contained.
