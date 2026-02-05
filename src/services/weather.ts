import { WeatherData } from '@/lib/types';

const ALYESKA_COORDS = {
    lat: 60.9705,
    lon: -149.0991
};

export async function getAlyeskaWeather(): Promise<WeatherData> {
    // Fetch current, hourly (for visibility/wind at altitude), and daily
    const params = new URLSearchParams({
        latitude: ALYESKA_COORDS.lat.toString(),
        longitude: ALYESKA_COORDS.lon.toString(),
        current: 'temperature_2m,wind_speed_10m,wind_gusts_10m,weather_code',
        hourly: 'visibility,wind_speed_80m', // 80m as proxy for ridge/flight level start
        daily: 'temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_probability_max',
        timezone: 'America/Anchorage',
        wind_speed_unit: 'mph',
        precipitation_unit: 'inch',
        temperature_unit: 'fahrenheit',
    });

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, { next: { revalidate: 900 } });

    if (!res.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();

    // Logic to determine Heli Viability
    // Rules: No fly if Visibility < 2 miles (approx 3200m) OR Wind > 30mph
    const currentVis = data.hourly.visibility[0]; // simplistic, should match current hour
    const currentWind80m = data.hourly.wind_speed_80m[0];

    let flightViable = true;
    let reason: string | null = null;

    if (currentVis < 3200) {
        flightViable = false;
        reason = "Poor Visibility";
    } else if (currentWind80m > 30) {
        flightViable = false;
        reason = "High Winds Aloft";
    }

    return {
        current: {
            temp: data.current.temperature_2m,
            windSpeed: data.current.wind_speed_10m,
            windGust: data.current.wind_gusts_10m,
            condition: decodeWeatherCode(data.current.weather_code),
            visibility: currentVis,
        },
        forecast: data.daily.time.map((date: string, i: number) => ({
            date,
            maxTemp: data.daily.temperature_2m_max[i],
            minTemp: data.daily.temperature_2m_min[i],
            snowfall: data.daily.snowfall_sum[i],
            precipProb: data.daily.precipitation_probability_max[i],
        })),
        heliAttributes: {
            baseWind: currentWind80m,
            visibilityCheck: currentVis >= 3200,
            flightViable,
            reason
        }
    };
}

function decodeWeatherCode(code: number): string {
    // Simple WMO code map
    if (code === 0) return 'Clear Sky';
    if (code < 3) return 'Partly Cloudy';
    if (code < 50) return 'Fog';
    if (code < 60) return 'Drizzle';
    if (code < 70) return 'Rain';
    if (code < 80) return 'Snow';
    if (code < 90) return 'Heavy Shower';
    return 'Storm';
}
