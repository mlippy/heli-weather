"use client";

import { HourlyForecast } from "@/lib/types";
import { Cloud, CloudRain, CloudSnow, Sun, Droplets } from "lucide-react";

export function HourlyForecastList({ data }: { data: HourlyForecast[] }) {
    if (!data || data.length === 0) return null;

    const getWeatherIcon = (code: number, size = 20) => {
        if (code === 0) return <Sun size={size} className="text-yellow-400" />;
        if (code < 3) return <Cloud size={size} className="text-slate-400" />;
        if (code < 70 && code >= 50) return <CloudRain size={size} className="text-blue-400" />;
        if (code >= 70) return <CloudSnow size={size} className="text-white" />;
        return <Cloud size={size} className="text-slate-400" />;
    };

    return (
        <div className="glass-card rounded-2xl p-6 w-full mb-6">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
                24-Hour Outlook
            </h3>
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {data.map((hour, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[70px] bg-slate-800/30 p-3 rounded-xl border border-white/5 shrink-0">
                        <span className="text-xs text-slate-400 mb-2 whitespace-nowrap">{hour.time}</span>
                        <div className="mb-2">
                            {getWeatherIcon(hour.weatherCode)}
                        </div>
                        <span className="text-sm font-bold">{Math.round(hour.temp)}°</span>
                        <div className="mt-1 flex items-center gap-0.5 text-xs text-blue-300">
                            <Droplets size={10} />
                            <span>{hour.precipProb}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
