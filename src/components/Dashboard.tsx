"use client";

import { useEffect, useState } from "react";
import { CurrentConditions } from "./CurrentConditions";
import { HeliCast } from "./HeliCast";
import { SnowChart } from "./SnowChart";
import { SatelliteMap } from "./SatelliteMap";
import { HourlyForecastList } from "./HourlyForecastList";
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
                <p>Contacting WeatherNext 2 Satellite...</p>
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
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {/* Row 1: Current Stats & Heli Status */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6">
                <CurrentConditions data={weather.current} />
                <HeliCast data={weather.heliAttributes} />
            </div>

            {/* Row 2: Hourly Forecast */}
            <HourlyForecastList data={weather.hourly} />

            {/* Row 3: Main Map & Snow Chart */}
            <SatelliteMap location={location} />
            <SnowChart data={weather.forecast} />

            {/* Footer / Credits */}
            <div className="text-center text-slate-500 text-xs mt-8">
                <p>Values provided by WeatherNext 2 (via OpenMeteo Proxy).
                    Conditions at ridge line (2000ft) estimated. Units: °F, mph, Inches.</p>
            </div>
        </div>
    );
}
