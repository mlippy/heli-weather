import { Fragment } from "react";
import { LOCATIONS } from "@/services/weather";

// Group locations by region for section headers
const regions = [
    { label: "Alaska", filter: (n: string) => n.includes(", AK") },
    { label: "British Columbia", filter: (n: string) => n.includes(", BC") },
    { label: "Lower 48 States", filter: (n: string) => !n.includes(", AK") && !n.includes(", BC") },
];

function extractDomain(url: string): string {
    try {
        const host = new URL(url).hostname.replace(/^www\./, "");
        return host;
    } catch {
        return url;
    }
}

function extractOperator(name: string): string {
    const match = name.match(/\((.+)\)/);
    return match ? match[1] : name;
}

export default function LocationsTable() {
    return (
        <section className="mt-16 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-arctic-300 to-arctic-500">
                All Heli-Ski Operators
            </h2>
            <p className="text-center text-slate-400 text-sm mb-8">
                Website links, descriptions, and indicative pricing for all tracked operators.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-700/50 backdrop-blur-md bg-slate-800/30">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-700/60 bg-slate-900/40">
                            <th className="px-4 py-3 font-semibold text-arctic-300 whitespace-nowrap">Operator</th>
                            <th className="px-4 py-3 font-semibold text-arctic-300 hidden md:table-cell">Location</th>
                            <th className="px-4 py-3 font-semibold text-arctic-300">Website</th>
                            <th className="px-4 py-3 font-semibold text-arctic-300 hidden lg:table-cell max-w-md">Description</th>
                            <th className="px-4 py-3 font-semibold text-arctic-300 whitespace-nowrap">Pricing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regions.map((region) => {
                            const locs = LOCATIONS.filter((l) => region.filter(l.name));
                            if (locs.length === 0) return null;
                            return (
                                <Fragment key={region.label}>
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-arctic-400 bg-slate-900/60 border-b border-t border-slate-700/40"
                                        >
                                            {region.label}
                                        </td>
                                    </tr>
                                    {locs.map((loc, i) => {
                                        const city = loc.name.split("(")[0].trim();
                                        const operator = extractOperator(loc.name);
                                        return (
                                            <tr
                                                key={loc.name}
                                                className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${i % 2 === 0 ? "bg-slate-800/10" : "bg-transparent"
                                                    }`}
                                            >
                                                <td className="px-4 py-3 font-medium text-slate-100 whitespace-nowrap">
                                                    {operator}
                                                </td>
                                                <td className="px-4 py-3 text-slate-400 hidden md:table-cell whitespace-nowrap">
                                                    {city}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <a
                                                        href={loc.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-arctic-400 hover:text-arctic-300 transition-colors underline decoration-arctic-400/30 hover:decoration-arctic-300"
                                                    >
                                                        {extractDomain(loc.website)}
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400 hidden lg:table-cell max-w-md">
                                                    <span className="line-clamp-2">{loc.description}</span>
                                                </td>
                                                <td className="px-4 py-3 text-slate-200 font-medium whitespace-nowrap">
                                                    {loc.pricing}
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

            <p className="text-center text-slate-500 text-xs mt-4">
                Pricing is approximate and subject to change. Contact operators directly for the latest rates and availability.
            </p>
        </section>
    );
}
