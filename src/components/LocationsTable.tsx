import { Fragment } from "react";
import { LOCATIONS } from "@/services/weather";
import { ExternalLink } from "lucide-react";
import { Location } from "@/lib/types";

const regions = [
    { label: "Alaska", filter: ", AK", borderColor: "border-l-amber-500", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", textColor: "text-amber-400" },
    { label: "British Columbia", filter: ", BC", borderColor: "border-l-sky-400", badge: "bg-sky-500/15 text-sky-400 border-sky-500/30", textColor: "text-sky-400" },
    { label: "Greenland & Iceland", filter: "__greenland_iceland__", borderColor: "border-l-indigo-400", badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30", textColor: "text-indigo-400" },
    { label: "South America - Andes", filter: "__chile__", borderColor: "border-l-rose-500", badge: "bg-rose-500/15 text-rose-500 border-rose-500/30", textColor: "text-rose-500" },
    { label: "Lower 48 States", filter: "__lower48__", borderColor: "border-l-emerald-400", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", textColor: "text-emerald-400" },
];

function regionForLoc(name: string) {
    if (name.includes(", AK")) return regions[0];
    if (name.includes(", BC")) return regions[1];
    if (name.includes("Greenland") || name.includes("Iceland")) return regions[2];
    if (name.includes("Chile")) return regions[3];
    return regions[4];
}

function locsForRegion(label: string) {
    if (label === "Alaska") return LOCATIONS.filter(l => l.name.includes(", AK"));
    if (label === "British Columbia") return LOCATIONS.filter(l => l.name.includes(", BC"));
    if (label === "Greenland & Iceland") return LOCATIONS.filter(l => l.name.includes("Greenland") || l.name.includes("Iceland"));
    if (label === "South America - Andes") return LOCATIONS.filter(l => l.name.includes("Chile"));
    return LOCATIONS.filter(l => !l.name.includes(", AK") && !l.name.includes(", BC") && !l.name.includes("Greenland") && !l.name.includes("Iceland") && !l.name.includes("Chile"));
}

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

            <div className="overflow-x-auto rounded-xl border border-slate-600/50 bg-slate-900/80">
                <table className="w-full text-left text-base">
                    <thead>
                        <tr className="bg-slate-800">
                            <th className="px-5 py-4 font-bold text-white uppercase text-sm tracking-widest">Operator</th>
                            <th className="px-5 py-4 font-bold text-white uppercase text-sm tracking-widest hidden md:table-cell">Location</th>
                            <th className="px-5 py-4 font-bold text-white uppercase text-sm tracking-widest">Site</th>
                            <th className="px-5 py-4 font-bold text-white uppercase text-sm tracking-widest hidden lg:table-cell">Description</th>
                            <th className="px-5 py-4 font-bold text-white uppercase text-sm tracking-widest">Pricing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regions.map((region) => {
                            const locs = locsForRegion(region.label);
                            if (locs.length === 0) return null;
                            return (
                                <Fragment key={region.label}>
                                    {/* Region header row */}
                                    <tr>
                                        <td colSpan={5} className="px-0 py-0">
                                            <div className={`px-5 py-2.5 bg-slate-900/80 border-l-4 ${region.borderColor}`}>
                                                <span className={`text-sm font-black uppercase tracking-[0.2em] ${region.textColor}`}>
                                                    ▸ {region.label}
                                                    <span className="text-slate-500 font-normal ml-2">({locs.length})</span>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    {locs.map((loc, i) => {
                                        const city = loc.name.split("(")[0].trim();
                                        const operator = extractOperator(loc.name);
                                        const reg = regionForLoc(loc.name);
                                        return (
                                            <tr
                                                key={loc.name}
                                                className={`border-b border-slate-700/40 hover:bg-slate-700/30 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-slate-800/50" : "bg-slate-900/30"}`}
                                                onClick={() => { onSelectLocation(loc); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                            >
                                                <td className="px-5 py-4">
                                                    <span className="font-bold text-white">{operator}</span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-300 text-sm hidden md:table-cell whitespace-nowrap">
                                                    {city}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <a
                                                        href={loc.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors text-sm"
                                                    >
                                                        {extractDomain(loc.website)}
                                                        <ExternalLink size={11} className="opacity-40" />
                                                    </a>
                                                </td>
                                                <td className="px-5 py-4 text-slate-300 text-sm hidden lg:table-cell max-w-sm">
                                                    <span className="line-clamp-1">{loc.description}</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-md border ${reg.badge}`}>
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
        </section>
    );
}
