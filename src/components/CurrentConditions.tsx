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

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="bg-white/10 p-2 rounded-lg shrink-0">
                            <Wind size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Wind Speed</p>
                            <p className="text-white font-mono text-base">{Math.round(data.windSpeed)} <span className="text-xs text-slate-500">mph</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="bg-white/10 p-2 rounded-lg shrink-0">
                            <Wind size={20} className="text-arctic-300 opacity-60" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Wind Gust</p>
                            <p className="text-white font-mono text-base">{Math.round(data.windGust)} <span className="text-xs text-slate-500">mph</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="bg-white/10 p-2 rounded-lg shrink-0">
                            <Eye size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Visibility</p>
                            <p className="text-white font-mono text-base">{(data.visibility / 1609.34).toFixed(1)} <span className="text-xs text-slate-500">mi</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="bg-white/10 p-2 rounded-lg shrink-0">
                            <Sun size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Light & Ceiling</p>
                            <p className="text-white font-mono text-xs leading-tight">
                                {data.lightCondition}<br />
                                <span className="text-slate-500 text-[10px]">{data.cloudCeiling}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
