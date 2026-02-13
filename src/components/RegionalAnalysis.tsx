import { RegionalWeather } from "@/lib/types";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Wind } from "lucide-react";

export function RegionalAnalysis({ data }: { data: RegionalWeather[] }) {
    if (!data || data.length === 0) return null;

    const north = data.find(i => i.direction === "North");
    const south = data.find(i => i.direction === "South");
    const east = data.find(i => i.direction === "East");
    const west = data.find(i => i.direction === "West");

    const renderCard = (item: RegionalWeather | undefined) => {
        if (!item) return null;
        return (
            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex flex-col items-center text-center hover:bg-slate-800/80 transition-colors h-full justify-center shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-arctic-400 font-bold uppercase text-xs tracking-widest">{item.direction}</span>
                    <span className="text-white font-bold text-xl">{Math.round(item.temp)}&deg;</span>
                </div>
                <div className="text-xs text-slate-300 leading-snug space-y-1 font-medium">
                    <p>{item.condition}</p>
                    <p>Vis: <span className="text-white">{(item.visibility / 1609.34).toFixed(1)} mi</span></p>
                    <p className="text-arctic-300">Wind: <span className="text-white">{Math.round(item.windSpeed)} mph</span></p>
                </div>
            </div>
        );
    };

    return (
        <div className="glass-panel p-6 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                <Wind size={16} /> Regional Recon
            </h3>

            <div className="flex-1 flex flex-col gap-4 max-w-sm mx-auto w-full h-full">
                {/* Top: North */}
                <div className="w-full flex-1">
                    {renderCard(north)}
                </div>

                {/* Middle: West - East */}
                <div className="grid grid-cols-2 gap-4 flex-[1.2]">
                    {renderCard(west)}
                    {renderCard(east)}
                </div>

                {/* Bottom: South */}
                <div className="w-full flex-1">
                    {renderCard(south)}
                </div>
            </div>
        </div>
    );
}
