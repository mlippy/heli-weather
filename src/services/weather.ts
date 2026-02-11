import { WeatherData } from '@/lib/types';

export const LOCATIONS = [
    // --- Alaska ---
    { name: 'Cordova, AK (Points North Heli-Adventures)', lat: 60.5447, lon: -145.7578 },
    { name: 'Judd Lake, AK (Tordrillo Mountain Lodge)', lat: 61.5693, lon: -151.5564 },
    { name: 'Girdwood, AK (Chugach Powder Guides)', lat: 60.7930, lon: -149.1246 },
    { name: 'Valdez, AK (Valdez Heli-Ski Guides)', lat: 61.1098, lon: -145.7876 },
    { name: 'Valdez, AK (Black Ops Valdez)', lat: 61.0863, lon: -146.1360 },
    { name: 'Valdez, AK (Alaska Backcountry Guides)', lat: 61.1240, lon: -146.3680 },
    { name: 'Glacier View, AK (Majestic Heli Ski)', lat: 61.8190, lon: -147.4579 },
    { name: 'Haines, AK (SEABA)', lat: 59.2358, lon: -135.4450 },
    { name: 'Haines, AK (Alaska Heliskiing)', lat: 59.4087, lon: -136.0665 },
    { name: 'Seward, AK (Silverton Mountain Guides)', lat: 60.1042, lon: -149.4422 },
    { name: 'Alyeska Resort, AK (Resort Base)', lat: 60.9705, lon: -149.0991 },

    // --- Canada (British Columbia) ---
    { name: 'Panorama, BC (RK Heliski)', lat: 50.4571, lon: -116.2439 },
    { name: 'Bella Coola, BC (Bella Coola Heli Sports)', lat: 52.3685, lon: -126.1666 },
    { name: 'Revelstoke, BC (Eagle Pass Heli Skiing)', lat: 50.9996, lon: -118.1957 },
    { name: 'Revelstoke, BC (Selkirk Tangiers)', lat: 51.0000, lon: -118.2000 },
    { name: 'Golden, BC (Great Canadian Heliskiing)', lat: 51.2999, lon: -116.9686 },
    { name: 'Blue River, BC (Mike Wiegele Heli Skiing)', lat: 52.1287, lon: -119.2818 },
    { name: 'Stewart, BC (Last Frontier Heliskiing)', lat: 55.9431, lon: -129.9881 },
    { name: 'Terrace, BC (Northern Escape Heli Skiing)', lat: 54.5186, lon: -128.6044 },
    { name: 'Whistler, BC (Whistler Heli-Skiing)', lat: 50.1163, lon: -122.9574 },
    { name: 'Nelson, BC (Snowwater Heli Skiing)', lat: 49.4939, lon: -117.2946 },

    // --- Lower 48 States ---
    { name: 'Mazama, WA (North Cascade Heli)', lat: 48.5963, lon: -120.4427 },
    { name: 'Sun Valley, ID (Sun Valley Heli Ski)', lat: 43.6971, lon: -114.3517 },
    { name: 'Driggs/Victor, ID (High Mountain Heli)', lat: 43.5358, lon: -111.1969 },
    { name: 'Jackson, WY (High Mountain Heli - Snake River)', lat: 43.2700, lon: -110.7800 },
    { name: 'Snowbird, UT (Powderbird)', lat: 40.5796, lon: -111.6669 },
    { name: 'Lamoille, NV (Ruby Mountain Heli)', lat: 40.7169, lon: -115.4157 },
    { name: 'Telluride, CO (Helitrax)', lat: 37.9358, lon: -107.8340 },
    { name: 'Silverton, CO (Silverton Mountain)', lat: 37.8847, lon: -107.6653 },
    { name: 'Bridgeport, CA (Sweetwater Heli)', lat: 38.2558, lon: -119.2313 },
];

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
    // Fetch current, hourly (for visibility/wind at altitude), and daily
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: 'temperature_2m,wind_speed_10m,wind_gusts_10m,weather_code',
        hourly: 'visibility,wind_speed_80m,temperature_2m,precipitation_probability,weather_code', // 80m as proxy for ridge/flight level start
        daily: 'temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_probability_max',
        timezone: 'America/Anchorage',
        wind_speed_unit: 'mph',
        precipitation_unit: 'inch',
        temperature_unit: 'fahrenheit',
    });

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

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
        },
        hourly: data.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            temp: data.hourly.temperature_2m[i],
            precipProb: data.hourly.precipitation_probability[i],
            weatherCode: data.hourly.weather_code[i],
            condition: decodeWeatherCode(data.hourly.weather_code[i]),
        }))
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
