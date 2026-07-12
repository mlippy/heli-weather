import { Fragment, useState } from "react";
import { ExternalLink, ChevronDown, ChevronRight, Plane } from "lucide-react";
import { Location } from "@/lib/types";

import { REGIONS, getRegionForLoc, getLocsForRegion, getTravelEstimate, formatHours } from "@/services/weather";

function extractDomain(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return url;
    }
}

function extractOperator(name: string): string {
    const match = name.match(/\((.+)\)/);
    return match ? match[1] : name;
}

export default function LocationsTable({ onSelectLocation }: { onSelectLocation: (loc: Location) => void }) {
    const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>(() =>
        REGIONS.reduce((acc: Record<string, boolean>, r) => ({ ...acc, [r.label]: true }), {})
    );

    const toggleRegion = (label: string) => {
        setExpandedRegions(prev => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <section className="mt-20 mb-8">
            {/* Section heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-white mb-1">
                    Operator Directory
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-amber-500 via-sky-400 to-emerald-400 rounded-full mt-3 mb-3" />
                <p className="text-slate-400 text-sm">
                    Pricing is approximate · Contact operators for current rates
                </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-900/40 backdrop-blur-md">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-950/50 backdrop-blur-md">
                        <tr>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-white/5">Operator</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-white/5">Location</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-white/5">Details</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-white/5">Travel from DC</th>
                            <th className="px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-white/5 text-right">Estimated Pricing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {REGIONS.map((region) => {
                            const locs = getLocsForRegion(region.label);
                            if (locs.length === 0) return null;
                            const isExpanded = expandedRegions[region.label];

                            return (
                                <Fragment key={region.label}>
                                    {/* Region Header Group */}
                                    <tr
                                        onClick={() => toggleRegion(region.label)}
                                        className="group cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5"
                                    >
                                        <td colSpan={5} className={`px-6 py-4 bg-slate-950/30 border-l-4 ${region.borderColor}`}>
                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs font-black uppercase tracking-[0.3em] ${region.textColor} flex items-center gap-2`}>
                                                    {isExpanded ? <ChevronDown size={14} className="opacity-70" /> : <ChevronRight size={14} className="opacity-70" />}
                                                    {region.label} <span className="text-slate-500 font-normal ml-1">({locs.length} Units)</span>
                                                </span>
                                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {isExpanded ? "Click to Collapse" : "Click to Expand"}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Location Rows */}
                                    {isExpanded && locs.map((loc) => {
                                        const city = loc.name.split("(")[0].trim();
                                        const operator = extractOperator(loc.name);
                                        const reg = getRegionForLoc(loc.name);
                                        const travel = getTravelEstimate(loc.name);
                                        return (
                                            <tr
                                                key={loc.name}
                                                className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 cursor-pointer"
                                                onClick={() => { onSelectLocation(loc); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            >
                                                <td className="px-6 py-5">
                                                    <span className="text-base font-bold text-white group-hover:text-arctic-400 transition-colors">{operator}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-medium text-slate-300">{city}</span>
                                                </td>
                                                <td className="px-6 py-5 max-w-sm">
                                                    <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed group-hover:line-clamp-none transition-all">{loc.description}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {travel ? (
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-200">
                                                                <Plane size={13} className="text-arctic-400 shrink-0" />
                                                                ~{formatHours(travel.flightHours + travel.driveHours)}
                                                            </span>
                                                            <span className="text-[10px] text-slate-500 tracking-wide">
                                                                {travel.origin} · {formatHours(travel.flightHours)} air &rarr; {travel.destAirport} + {formatHours(travel.driveHours)} drive
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-slate-600">&mdash;</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${reg.badge}`}>
                                                        {loc.pricing}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-8">
                {REGIONS.map((region) => {
                    const locs = getLocsForRegion(region.label);
                    if (locs.length === 0) return null;
                    const isExpanded = expandedRegions[region.label];

                    return (
                        <div key={region.label} className="space-y-3">
                            {/* Region Header */}
                            <div
                                onClick={() => toggleRegion(region.label)}
                                className={`px-4 py-3 bg-slate-900/80 border-l-4 ${region.borderColor} rounded-r-lg flex items-center justify-between cursor-pointer active:bg-slate-800/60 transition-colors`}
                            >
                                <span className={`text-xs font-black uppercase tracking-[0.2em] ${region.textColor} flex items-center gap-2`}>
                                    {isExpanded ? <ChevronDown size={14} className="opacity-70" /> : <ChevronRight size={14} className="opacity-70" />}
                                    {region.label} <span className="text-slate-500 font-normal ml-1">({locs.length})</span>
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                    {isExpanded ? "Hide" : "Show"}
                                </span>
                            </div>

                            {/* Cards */}
                            {isExpanded && (
                                <div className="grid grid-cols-1 gap-3">
                                    {locs.map((loc) => {
                                        const city = loc.name.split("(")[0].trim();
                                        const operator = extractOperator(loc.name);
                                        const reg = getRegionForLoc(loc.name);
                                        const travel = getTravelEstimate(loc.name);
                                        return (
                                            <div
                                                key={loc.name}
                                                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 active:bg-slate-800/60 transition-colors cursor-pointer"
                                                onClick={() => { onSelectLocation(loc); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-white text-lg leading-tight">{operator}</h3>
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ml-2 text-right ${reg.badge}`}>
                                                        {loc.pricing}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <p className="text-slate-300 text-sm font-medium mb-1">{city}</p>
                                                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{loc.description}</p>
                                                </div>

                                                {travel && (
                                                    <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-300">
                                                        <Plane size={13} className="text-arctic-400 shrink-0" />
                                                        <span className="font-bold">~{formatHours(travel.flightHours + travel.driveHours)} from {travel.origin}</span>
                                                        <span className="text-slate-500">({formatHours(travel.flightHours)} air &rarr; {travel.destAirport} + {formatHours(travel.driveHours)} drive)</span>
                                                    </div>
                                                )}

                                                <div>
                                                    <a
                                                        href={loc.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors text-xs font-medium uppercase tracking-wide"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Visit Website <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
