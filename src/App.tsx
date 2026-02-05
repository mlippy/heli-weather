import Dashboard from "@/components/Dashboard";
import { Mountain } from "lucide-react";
import { WeatherBackground } from "@/components/WeatherBackground";
import { useEffect, useState } from "react";
import { WeatherData } from "@/lib/types";
import { getAlyeskaWeather } from "@/services/weather";

export default function App() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAlyeskaWeather();
                setWeather(data);
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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
                            ALYESKA<span className="text-arctic-500">.Next</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl tracking-wide font-light max-w-2xl">
                            PREMIUM SNOW REPORT & HELI OPS
                        </p>
                    </header>

                    {/* Dashboard Content */}
                    <Dashboard weather={weather} loading={loading} />

                </div>
            </main>
        </div>
    );
}
