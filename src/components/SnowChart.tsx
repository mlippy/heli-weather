"use client";

import { WeatherData } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalendarDays } from "lucide-react";

export function SnowChart({ data }: { data: WeatherData["forecast"] }) {
    // Format data for chart
    const chartData = data.slice(0, 5).map(day => ({
        name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        snow: day.snowfall, // Already in inches from API
        temp: day.maxTemp,
    }));

    return (
        <div className="glass-panel p-6 rounded-3xl col-span-2">
            <h2 className="text-xl font-bold text-arctic-200 mb-6 uppercase tracking-wider flex items-center gap-2">
                <CalendarDays size={20} /> Snow Forecast (Inches)
            </h2>

            <div className="h-64 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            hide
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number | undefined) => [`${(value || 0).toFixed(1)}"`, 'Snowfall']}
                        />
                        <Bar dataKey="snow" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.snow > 0 ? '#38bdf8' : '#334155'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-between text-sm text-slate-400">
                <p>Next 5 Days</p>
                <p>Total Potential: <span className="text-white font-bold">{chartData.reduce((a, b) => a + b.snow, 0).toFixed(1)}"</span></p>
            </div>
        </div>
    );
}
