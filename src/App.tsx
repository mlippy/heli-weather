import Dashboard from "@/components/Dashboard";
import { Mountain } from "lucide-react";
import { WeatherBackground } from "@/components/WeatherBackground";
import { useEffect, useState } from "react";
import { WeatherData } from "@/lib/types";
import { getWeather, LOCATIONS } from "@/services/weather";

export default function App() {
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="antialiased min-h-screen relative text-slate-50 bg-slate-900">
            <WeatherBackground condition={weather?.current.condition} />
            <main className="min-h-screen p-4 md:p-12 relative">
                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header */}
                    <header className="mb-12 flex flex-col items-center justify-center text-center">
                        <div className="p-4 bg-arctic-500/10 rounded-full mb-6 border border-arctic-400/20 backdrop-blur-md">
                            <Mountain className="text-arctic-300 w-12 h-12" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-arctic-200 mb-4">
                            HELI<span className="text-arctic-500"> VIBE</span>
                        </h1>
                        <div className="relative">
                            <select
                                value={selectedLocation.name}
                                onChange={(e) => {
                                    const loc = LOCATIONS.find(l => l.name === e.target.value);
                                    if (loc) setSelectedLocation(loc);
                                }}
                                className="appearance-none bg-slate-800/50 backdrop-blur-md border border-slate-700 text-slate-200 text-sm md:text-base rounded-full px-6 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-arctic-500 cursor-pointer hover:bg-slate-800/80 transition-colors text-center"
                            >
                                {LOCATIONS.map(loc => (
                                    <option key={loc.name} value={loc.name} className="bg-slate-900 text-slate-200">
                                        {loc.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <Dashboard weather={weather} loading={loading} />

                </div>
            </main>
        </div>
    );
}
