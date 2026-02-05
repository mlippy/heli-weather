"use client";

import { useEffect, useState } from "react";
import { getAlyeskaWeather } from "@/services/weather";
import { CurrentConditions } from "./CurrentConditions";
import { HeliCast } from "./HeliCast";
import { SnowChart } from "./SnowChart";
import { WeatherData } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAlyeskaWeather();
                setWeather(data);
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Top Row: Current Stats & Heli Status */}
            <CurrentConditions data={weather.current} />
            <HeliCast data={weather.heliAttributes} />

            {/* Middle Row: Charts & Trends */}
            <SnowChart data={weather.forecast} />

            {/* Footer / Credits */}
            <div className="col-span-1 lg:col-span-2 text-center text-slate-500 text-xs mt-8">
                <p>Values provided by WeatherNext 2 (via OpenMeteo Proxy).
                    Conditions at ridge line (2000ft) estimated. Units: °F, mph, Inches.</p>
            </div>
        </div>
    );
}
