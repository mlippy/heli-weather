# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Heli-Vibes is a static React + Vite single-page app that shows heli-skiing weather forecasts for a curated global list of heli operators. It has no backend — all weather data comes from the free [Open-Meteo](https://open-meteo.com/) API, called directly from the browser. It deploys as static files to GitHub Pages.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b type-check, then vite build to dist/
npm run preview    # serve the production build
npm run lint       # eslint over the repo

npx jest                          # run the test suite (no "test" npm script exists)
npx jest __tests__/weather.test.ts        # run a single test file
npx jest -t "flightViable"                # run tests matching a name
```

Note: Vite is configured with `base: '/heli-weather/'` (vite.config.ts), so the production build assumes it is served from that path (GitHub Pages project site). Change `base` if deploying elsewhere.

## Architecture

The app is a single data pipeline: pick a location → fetch weather → derive heli-flight viability → render dashboard.

- **`src/services/weather.ts`** — the core of the app. Contains three distinct concerns in one file:
  1. `LOCATIONS` — the hardcoded array of every heli operator (name, lat/lon, website, description, pricing). Adding/removing an operator means editing this array. The `name` string is load-bearing: region detection parses substrings out of it (see below).
  2. `REGIONS` + `getRegionForLoc()` / `getLocsForRegion()` — region assignment is done by **string-matching the operator's `name`** (e.g. `", AK"`, `"Switzerland"`, `"Bugaboos"`). There is no explicit region field on a location. When adding an operator, its name must contain a token these functions recognize, or it falls through to "Lower 48 States". Keep the matching lists in `getRegionForLoc`, `getLocsForRegion`, and the `REGIONS` array in sync.
  3. `getWeather(lat, lon)` — fetches Open-Meteo forecast + regional readings and transforms the raw API response into the `WeatherData` shape. This is where all heli-domain logic lives: `estimateCeiling`, `calculateLightCondition` (flat-light detection from direct/diffuse radiation), `decodeWeatherCode`, and `fetchRegionalWeather` (samples 4 compass points ~0.5° / ~55km away). The flight-viability rules are here: no-fly if visibility < 3200m, wind at 80m > 30mph, or "Flat Light". Uses wind at 80m as a proxy for ridge/flight-level wind.

- **`src/lib/types.ts`** — all shared interfaces (`WeatherData`, `HeliAttributes`, `Location`, `Region`, forecast shapes). Start here to understand the data contract between the service and components.

- **`src/App.tsx`** — top-level state and layout. Owns `selectedLocation` and `selectedRegion`, re-fetches weather on location change, and syncs the selected location to the `?location=` URL query param (shareable links). The region dropdown filters the location dropdown.

- **`src/components/`** — presentational components fed by `Dashboard.tsx`, which fans `WeatherData` out to `CurrentConditions`, `HeliCast` (flight go/no-go), `SnowChart` (Recharts), `SatelliteMap` (React-Leaflet), `HourlyForecastList`, and `RegionalAnalysis`. `WeatherBackground` renders an animated backdrop driven by the current condition string.

## Conventions

- Path alias `@/` → `src/` is defined in three places that must agree: `vite.config.ts`, `tsconfig.json`, and `jest.config.js` (`moduleNameMapper`).
- Styling is Tailwind CSS v4 (utility classes inline; custom `arctic` color scale in `tailwind.config.ts`). There are no CSS modules.
- Tests use Jest + ts-jest + jsdom and mock `global.fetch` to exercise `getWeather`'s transform/viability logic against canned Open-Meteo responses.
