import { WeatherData } from "@/lib/types";
import { Wind, Thermometer, Eye, CloudSnow } from "lucide-react";

export function CurrentConditions({ data }: { data: WeatherData["current"] }) {
    return (
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <CloudSnow size={120} />
            </div>

            <h2 className="text-xl font-bold text-arctic-200 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Thermometer size={20} /> Current Conditions
            </h2>

            <div className="grid grid-cols-2 gap-8 relative z-10">
                <div>
                    <p className="text-slate-400 text-sm">Temperature</p>
                    <div className="text-5xl font-bold text-white tracking-tighter">
                        {Math.round(data.temp)}°
                    </div>
                    <p className="text-arctic-400 mt-1 font-medium">{data.condition}</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Wind size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400">Wind (Gust)</p>
                            <p className="text-lg font-semibold text-white">
                                {Math.round(data.windSpeed)} <span className="text-sm text-slate-400">mph</span>
                                <span className="text-slate-500 mx-1">/</span>
                                <span className="text-signal-orange">{Math.round(data.windGust)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Eye size={20} className="text-arctic-300" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400">Visibility</p>
                            <p className="text-lg font-semibold text-white">
                                {(data.visibility / 1609.34).toFixed(1)} <span className="text-sm text-slate-400">mi</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
