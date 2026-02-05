import { WeatherData } from "@/lib/types";
import { Plane, AlertTriangle, CheckCircle2 } from "lucide-react";

export function HeliCast({ data }: { data: WeatherData["heliAttributes"] }) {
    const isGo = data.flightViable;

    return (
        <div className={`glass-panel p-6 rounded-3xl border-l-4 ${isGo ? 'border-signal-green' : 'border-signal-red'}`}>
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-arctic-200 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <Plane size={20} className={isGo ? "-rotate-45" : ""} /> Heli Ops Status
                    </h2>

                    <div className="mt-4">
                        {isGo ? (
                            <div className="flex items-center gap-3 text-signal-green">
                                <CheckCircle2 size={32} />
                                <span className="text-3xl font-black tracking-tight">GO FOR LAUNCH</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-signal-red">
                                <AlertTriangle size={32} />
                                <span className="text-3xl font-black tracking-tight">NO FLY</span>
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-slate-300 max-w-xs leading-relaxed">
                        {isGo
                            ? "Conditions are optimal for flight operations. Wind and visibility are within safe margins."
                            : `Flight operations suspended due to: ${data.reason}.`}
                    </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl space-y-2 min-w-[140px]">
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase">Ridge Wind</p>
                        <p className={`font-mono font-bold ${data.baseWind > 25 ? 'text-signal-orange' : 'text-white'}`}>
                            {Math.round(data.baseWind)} mph
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase">Vis Check</p>
                        <p className={`font-mono font-bold ${data.visibilityCheck ? 'text-signal-green' : 'text-signal-red'}`}>
                            {data.visibilityCheck ? 'PASS' : 'FAIL'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
