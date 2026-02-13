"use client";

import "react";
import { CurrentConditions } from "./CurrentConditions";
import { HeliCast } from "./HeliCast";
import { SnowChart } from "./SnowChart";
import { SatelliteMap } from "./SatelliteMap";
import { HourlyForecastList } from "./HourlyForecastList";
import { RegionalAnalysis } from "./RegionalAnalysis";
import { WeatherData, Location } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface DashboardProps {
    weather: WeatherData | null;
    loading: boolean;
    location: Location;
}

export default function Dashboard({ weather, loading, location }: DashboardProps) {

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400 gap-4">
                <Loader2 className="animate-spin text-arctic-400" size={48} />
                <p>Connecting to weather data...</p>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="text-center text-signal-red p-12">
                <p>Failed to load weather data.</p>
                <p className="text-sm mt-2 text-slate-400">Please check your internet connection.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            {/* Row 1: Current Stats & Heli Status */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6">
                <CurrentConditions data={weather.current} elevation={weather.elevation} />
                <HeliCast data={weather.heliAttributes} />
            </div>

            {/* Row 2: Hourly Forecast */}
            <HourlyForecastList data={weather.hourly} />

            {/* Row 3: Regional Analysis & Main Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[600px]">
                <RegionalAnalysis data={weather.regional} />
                <SatelliteMap location={location} />
            </div>

            {/* Row 4: Snow Chart */}
            <SnowChart data={weather.forecast} />

            {/* Footer / Credits */}
            <div className="text-center text-slate-500 text-xs mt-8 pb-8">
                <p className="mb-2">
                    <span className="font-mono text-arctic-400">
                        LAT: {location.lat.toFixed(4)}&deg; | LON: {location.lon.toFixed(4)}&deg; | ELEV: {weather.elevation ? Math.round(weather.elevation) : 'N/A'} ft
                    </span>
                </p>
                <p>Values provided by Open-Meteo https://open-meteo.com/.
                    Units: &deg;F, mph, Inches.</p>
            </div>
        </div>
    );
}
