# Heli-Vibe Heli Skiing Weather App

A static React application designed to provide crucial weather data for heli-skiing operations. This app aggregates real-time weather conditions, forecasts, and improved satellite imagery to help guides and pilots make informed decisions.

## Features

-   **Dashboard:** Instant overview of current conditions (temp, wind, visibility) and heli-specific status indicators.
-   **Hourly Forecast:** Detailed hourly breakdown of weather metrics.
-   **Interactive Map:** Satellite view with location markers for key landing zones and weather stations.
-   **Snow Chart:** 7-day snow accumulation forecast.
-   **Multiple Locations:** Switch between different operational zones (e.g., Base, Ridge Top, Pick-up Zones).

## Origins

This project was "vibe coded" during downtime while waiting for a weather hold to clear for a heli-skiing trip. It was built rapidly to address a specific need for consolidated, easy-to-read weather data in a high-stakes environment.

## Tech Stack

-   **React:** UI library (Vite for build tooling).
-   **TypeScript:** Type safety and developer experience.
-   **Tailwind CSS:** Utility-first styling for a custom, responsive design.
-   **Leaflet / React-Leaflet:** Interactive maps.
-   **Recharts:** Data visualization for snow totals.
-   **Lucide React:** Icons.
-   **OpenMeteo API:** Source for weather data (free for non-commercial use).

## Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mlippy/heli-weather.git
    cd heli-weather
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Deployment

This project is configured as a static site and can be deployed to GitHub Pages, Vercel, or any static hosting provider.
