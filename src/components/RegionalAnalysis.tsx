import { RegionalWeather } from "@/lib/types";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Wind } from "lucide-react";

export function RegionalAnalysis({ data }: { data: RegionalWeather[] }) {
    if (!data || data.length === 0) return null;

    const getIcon = (dir: string) => {
        switch (dir) {
            case "North": return <ArrowUp size={20} />;
            case "South": return <ArrowDown size={20} />;
            case "East": return <ArrowRight size={20} />;
            case "West": return <ArrowLeft size={20} />;
            default: return null;
        }
    };

    return (
        <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-6 flex items-center gap-2">
                <Wind size={16} /> Regional Recon (50km Radius)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.map((item) => (
                    <div key={item.direction} className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex flex-col items-center text-center hover:bg-slate-800/80 transition-colors">
                        <div className="text-arctic-400 mb-2 p-2 bg-arctic-900/30 rounded-full">
                            {getIcon(item.direction)}
                        </div>
                        <h4 className="text-white font-medium mb-1">{item.direction} Sector</h4>
                        <div className="text-2xl font-bold text-slate-200 my-1">
                            {Math.round(item.temp)}&deg;
                        </div>
                        <p className="text-xs text-slate-400 mb-1">{item.condition}</p>
                        <p className="text-xs text-slate-500 mb-2">Elev: {Math.round(item.elevation)} ft</p>
                        <p className="text-xs text-slate-400 mb-2">
                            Vis: {(item.visibility / 1609.34).toFixed(1)} mi
                        </p>
                        <p className="text-xs text-arctic-300 font-mono">
                            Wind: {Math.round(item.windSpeed)} mph
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
