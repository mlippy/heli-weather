import Dashboard from "@/components/Dashboard";
import LocationsTable from "@/components/LocationsTable";
import logoImg from "@/lib/images/Gemini_Generated_Image_q9st6mq9st6mq9st-fotor-bg-remover-20260212215636.png";
import { WeatherBackground } from "@/components/WeatherBackground";
import { useEffect, useState } from "react";
import { WeatherData } from "@/lib/types";
import { getWeather, LOCATIONS, REGIONS, getRegionForLoc, getTravelEstimate, formatHours } from "@/services/weather";
import { Share2, Check, Plane } from "lucide-react";

export default function App() {
    const [selectedLocation, setSelectedLocation] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const locName = params.get('location');
            if (locName) {
                const found = LOCATIONS.find(l => l.name === locName);
                if (found) return found;
            }
        }
        return LOCATIONS[0];
    });

    // Region filter state
    const [selectedRegion, setSelectedRegion] = useState("All");

    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    // Sync region filter when location changes (e.g. via URL or Table)
    useEffect(() => {
        if (selectedRegion !== "All") {
            const currentReg = getRegionForLoc(selectedLocation.name);
            if (currentReg.label !== selectedRegion) {
                // If the manually selected location is outside the filter, 
                // we keep the location but maybe we should reset filter?
                // User preference usually: show me where I am.
                setSelectedRegion("All");
            }
        }
    }, [selectedLocation]);

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('location') !== selectedLocation.name) {
            params.set('location', selectedLocation.name);
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [selectedLocation]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getWeather(selectedLocation.lat, selectedLocation.lon);
                setWeather(data);
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [selectedLocation]);

    const handleShare = async () => {
        const shareData = {
            title: 'Heli Vibes - Weather Forecast',
            text: `Check out the weather at ${selectedLocation.name} for heli-skiing!`,
            url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Error copying to clipboard:', err);
            }
        }
    };

    // Filtered locations for the dropdown
    const filteredLocations = selectedRegion === "All"
        ? LOCATIONS
        : LOCATIONS.filter(l => getRegionForLoc(l.name).label === selectedRegion);

    // Approx travel time from the DC area (BWI/Dulles) to the selected operator
    const travel = getTravelEstimate(selectedLocation.name);

    return (
        <div className="antialiased min-h-screen relative text-slate-50">
            <WeatherBackground condition={weather?.current.condition} />
            <main className="min-h-screen p-4 md:p-12 relative">
                <div className="w-full max-w-[95%] mx-auto relative z-10">

                    {/* Header */}
                    <header className="mb-8 grid grid-cols-1 lg:grid-cols-3 items-center gap-8 p-10 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                        {/* Left Column: Branding */}
                        <div className="flex items-center gap-6 justify-start">
                            <img src={logoImg} alt="Heli Vibes" className="w-24 h-24 rounded-full shadow-lg shadow-arctic-500/20 ring-4 ring-white/5 shrink-0" />
                            <div className="flex flex-col">
                                <h1 className="text-5xl xl:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-arctic-200 leading-none">
                                    HELI<span className="text-arctic-500"> VIBES</span>
                                </h1>
                                <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] mt-3 uppercase opacity-60">Global Operator Forecasts</p>
                            </div>
                        </div>

                        {/* Center Column: Controls & Description */}
                        <div className="flex flex-col items-center gap-6 w-full lg:max-w-xl mx-auto">
                            {/* Selectors Row */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                                {/* Region Filter */}
                                <div className="relative flex-grow sm:flex-1 w-full">
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => {
                                            const newRegion = e.target.value;
                                            setSelectedRegion(newRegion);
                                            if (newRegion !== "All") {
                                                const firstInRegion = LOCATIONS.find(l => getRegionForLoc(l.name).label === newRegion);
                                                if (firstInRegion && getRegionForLoc(selectedLocation.name).label !== newRegion) {
                                                    setSelectedLocation(firstInRegion);
                                                }
                                            }
                                        }}
                                        className="w-full appearance-none bg-slate-950/50 backdrop-blur-md border border-slate-700/60 text-slate-200 text-xs font-black uppercase tracking-widest rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-arctic-500/50 cursor-pointer hover:bg-slate-900/60 transition-colors shadow-lg"
                                    >
                                        <option value="All">All Regions</option>
                                        {REGIONS.map(reg => (
                                            <option key={reg.label} value={reg.label}>{reg.label}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>

                                {/* Location Selector */}
                                <div className="relative flex-[1.5] flex-grow w-full">
                                    <select
                                        value={selectedLocation.name}
                                        onChange={(e) => {
                                            const loc = LOCATIONS.find(l => l.name === e.target.value);
                                            if (loc) setSelectedLocation(loc);
                                        }}
                                        className="w-full appearance-none bg-slate-950/50 backdrop-blur-md border border-slate-700/60 text-slate-200 text-xs font-black uppercase tracking-widest rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-arctic-500/50 cursor-pointer hover:bg-slate-900/60 transition-colors shadow-lg"
                                    >
                                        {filteredLocations.map(loc => (
                                            <option key={loc.name} value={loc.name} className="bg-slate-900 text-slate-200">
                                                {loc.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Info & Description Group */}
                            <div className="flex flex-col items-center gap-4 w-full">
                                <div className="flex items-center justify-center gap-4">
                                    {selectedLocation.website && (
                                        <a
                                            href={selectedLocation.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-arctic-400 hover:text-arctic-300 text-[10px] font-black tracking-[0.3em] uppercase hover:underline decoration-arctic-400/30 underline-offset-4 transition-colors flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-arctic-500/50" />
                                            {(() => {
                                                try {
                                                    return new URL(selectedLocation.website).hostname.replace(/^www\./, "");
                                                } catch {
                                                    return "Visit Website";
                                                }
                                            })()}
                                        </a>
                                    )}

                                    {/* Share Button relocated next to link */}
                                    <button
                                        onClick={handleShare}
                                        className={`shrink-0 h-8 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 shadow-sm backdrop-blur-md ${copied ? 'bg-arctic-500/20 border-arctic-400 text-arctic-300' : 'bg-slate-950/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
                                        title="Share current location"
                                    >
                                        {copied ? <Check size={14} /> : <Share2 size={14} />}
                                        <span className="text-[10px] font-black uppercase tracking-tighter">{copied ? 'Copied' : 'Share'}</span>
                                    </button>
                                </div>

                                {travel && (
                                    <div
                                        className="flex items-center gap-2.5 bg-slate-950/40 border border-slate-700/50 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-md"
                                        title={`From ${travel.origin}: ~${formatHours(travel.flightHours)} flying to ${travel.destAirport} + ~${formatHours(travel.driveHours)} drive`}
                                    >
                                        <Plane size={15} className="text-arctic-400 shrink-0" />
                                        <span className="text-[11px] font-black uppercase tracking-tighter text-slate-200">
                                            ~{formatHours(travel.flightHours + travel.driveHours)} from {travel.origin}
                                        </span>
                                        <span className="text-[10px] font-medium tracking-wide text-slate-400">
                                            ({formatHours(travel.flightHours)} air &rarr; {travel.destAirport} + {formatHours(travel.driveHours)} drive)
                                        </span>
                                    </div>
                                )}

                                <div className="bg-slate-950/30 p-6 rounded-2xl border border-white/5 shadow-inner backdrop-blur-sm w-full text-center">
                                    <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed italic opacity-90 max-w-lg mx-auto">
                                        "{selectedLocation.description}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Spacing/Balance (Empty on Desktop) */}
                        <div className="hidden lg:flex justify-end pr-4 opacity-10">
                            {/* Subtle deco element for balance */}
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <Dashboard weather={weather} loading={loading} location={selectedLocation} />

                    {/* All Operators Table */}
                    <LocationsTable onSelectLocation={setSelectedLocation} />

                </div>
            </main>
        </div>
    );
}

