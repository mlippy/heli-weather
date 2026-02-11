import { WeatherData } from "@/lib/types";
import { Wind, Thermometer, Eye, CloudSnow, Sun } from "lucide-react";

export function CurrentConditions({ data, elevation }: { data: WeatherData["current"], elevation: number | undefined }) {
    return (
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <CloudSnow size={120} />
            </div>

            <h2 className="text-xl font-bold text-arctic-200 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Thermometer size={20} /> Current Conditions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                <div>
                    <p className="text-slate-400 text-sm">Temperature</p>
                    <div className="text-5xl font-bold text-white tracking-tighter">
                        {Math.round(data.temp)}&deg;
                    </div>
                    <p className="text-arctic-400 mt-1 font-medium">{data.condition}</p>
                    {elevation && <p className="text-xs text-slate-500 mt-2">Elev: {Math.round(elevation)} ft</p>}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Wind size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Wind Speed</p>
                            <p className="text-white font-mono text-lg">{Math.round(data.windSpeed)} <span className="text-sm text-slate-500">mph</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Wind size={20} className="text-arctic-300 opacity-60" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Wind Gust</p>
                            <p className="text-white font-mono text-lg">{Math.round(data.windGust)} <span className="text-sm text-slate-500">mph</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Eye size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Visibility</p>
                            <p className="text-white font-mono text-lg">{(data.visibility / 1609.34).toFixed(1)} <span className="text-sm text-slate-500">mi</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Sun size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">Light & Ceiling</p>
                            <p className="text-white font-mono text-sm leading-tight">
                                {data.lightCondition}<br />
                                <span className="text-slate-500 text-xs">{data.cloudCeiling}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
