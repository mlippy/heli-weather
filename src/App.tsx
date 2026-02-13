import Dashboard from "@/components/Dashboard";
import LocationsTable from "@/components/LocationsTable";
import logoImg from "@/lib/images/Gemini_Generated_Image_q9st6mq9st6mq9st-fotor-bg-remover-20260212215636.png";
import { WeatherBackground } from "@/components/WeatherBackground";
import { useEffect, useState } from "react";
import { WeatherData } from "@/lib/types";
import { getWeather, LOCATIONS } from "@/services/weather";
import { Share2, Check } from "lucide-react";

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
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

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

    return (
        <div className="antialiased min-h-screen relative text-slate-50">
            <WeatherBackground condition={weather?.current.condition} />
            <main className="min-h-screen p-4 md:p-12 relative">
                <div className="w-full max-w-[95%] mx-auto relative z-10">

                    {/* Header */}
                    <header className="mb-8 grid grid-cols-1 lg:grid-cols-3 items-center gap-6 p-6 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                        {/* Left: Logo & Title */}
                        <div className="flex items-center gap-5 justify-start">
                            <img src={logoImg} alt="Heli Vibes" className="w-20 h-20 rounded-full shadow-lg shadow-arctic-500/20" />
                            <h1 className="text-4xl xl:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-arctic-200 leading-none">
                                HELI<span className="text-arctic-500"> VIBES</span>
                            </h1>
                        </div>

                        {/* Center: Dropdown & Link */}
                        <div className="flex flex-col items-center justify-center w-full gap-3">
                            <div className="flex items-center gap-2 w-full max-w-md">
                                <div className="relative flex-grow">
                                    <select
                                        value={selectedLocation.name}
                                        onChange={(e) => {
                                            const loc = LOCATIONS.find(l => l.name === e.target.value);
                                            if (loc) setSelectedLocation(loc);
                                        }}
                                        className="w-full appearance-none bg-slate-950/50 backdrop-blur-md border border-slate-700/60 text-slate-200 text-base font-medium rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-arctic-500/50 cursor-pointer hover:bg-slate-900/60 transition-colors shadow-lg"
                                    >
                                        {LOCATIONS.map(loc => (
                                            <option key={loc.name} value={loc.name} className="bg-slate-900 text-slate-200">
                                                {loc.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className={`p-3 rounded-xl border transition-all flex items-center gap-2 shadow-lg backdrop-blur-md ${copied ? 'bg-arctic-500/20 border-arctic-400 text-arctic-300' : 'bg-slate-950/50 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'}`}
                                    title="Share current location"
                                >
                                    {copied ? <Check size={20} /> : <Share2 size={20} />}
                                    <span className="text-sm font-bold hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
                                </button>
                            </div>
                            {selectedLocation.website && (
                                <a
                                    href={selectedLocation.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-arctic-400 hover:text-arctic-300 text-sm font-bold tracking-wide hover:underline decoration-arctic-400/30 underline-offset-4 transition-colors"
                                >
                                    {(() => {
                                        try {
                                            return new URL(selectedLocation.website).hostname.replace(/^www\./, "");
                                        } catch {
                                            return "Visit Website";
                                        }
                                    })()}
                                </a>
                            )}
                        </div>

                        {/* Right: Info */}
                        <div className="flex flex-col items-center lg:items-end justify-center h-full">
                            <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 shadow-inner backdrop-blur-sm max-w-md">
                                <p className="text-slate-100 text-base lg:text-lg font-medium leading-relaxed text-left">
                                    {selectedLocation.description}
                                </p>
                            </div>
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

