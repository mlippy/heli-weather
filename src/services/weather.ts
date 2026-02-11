import { WeatherData, RegionalWeather } from '@/lib/types';

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
    // 1. Fetch Main Forecast & Elevation
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: 'temperature_2m,wind_speed_10m,wind_gusts_10m,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,direct_radiation,diffuse_radiation',
        hourly: 'visibility,wind_speed_80m,temperature_2m,precipitation_probability,weather_code', // 80m as proxy for ridge/flight level start
        daily: 'temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_probability_max',
        timezone: 'America/Anchorage', // This might need to be dynamic based on location, but OpenMeteo handles auto? using auto for safety
        wind_speed_unit: 'mph',
        precipitation_unit: 'inch',
        temperature_unit: 'fahrenheit',
        elevation: 'nan' // Request elevation data
    });

    // We need to use "auto" timezone or specific one. Let's try to infer or use auto to be safe across regions.
    // Actually OpenMeteo defaults to GMT if not specified, or we can use "auto".
    params.set("timezone", "auto");

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

    if (!res.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();

    // 2. Fetch Regional Weather (N, S, E, W - approx 50km/0.5 deg away)
    // 1 deg lat is approx 111km. 0.5 deg is ~55km.
    // 1 deg lon varies. at 60N, 1 deg is ~55km.
    const regional = await fetchRegionalWeather(lat, lon);

    // Helper: Estimate Ceiling
    const ceiling = estimateCeiling(
        data.current.cloud_cover_low,
        data.current.cloud_cover_mid,
        data.current.cloud_cover_high
    );

    // Helper: Estimate Light
    const light = calculateLightCondition(
        data.current.direct_radiation,
        data.current.diffuse_radiation,
        data.current.cloud_cover
    );

    // Logic to determine Heli Viability
    // Rules: No fly if Visibility < 2 miles (approx 3200m) OR Wind > 30mph OR Flat Light
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
    } else if (light === "Flat Light") {
        flightViable = false;
        reason = "Flat Light / Low Contrast";
    }

    return {
        current: {
            temp: data.current.temperature_2m,
            windSpeed: data.current.wind_speed_10m,
            windGust: data.current.wind_gusts_10m,
            condition: decodeWeatherCode(data.current.weather_code),
            visibility: currentVis,
            lightCondition: light,
            cloudCeiling: ceiling,
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
        })),
        elevation: data.elevation,
        regional: regional
    };
}

function estimateCeiling(low: number, mid: number, high: number): string {
    if (low > 50) return "Low (< 6500ft)";
    if (mid > 50) return "Mid (6500-20k ft)";
    if (high > 50) return "High (> 20k ft)";
    return "Unlimited / Clear";
}

function calculateLightCondition(direct: number, diffuse: number, cloudCover: number): string {
    // If it's night (both near 0), handled simply?
    if (direct < 5 && diffuse < 5) return "Low Light / Night";

    const total = direct + diffuse;
    if (total === 0) return "Low Light";

    // Ratio of diffuse to total. High diffuse means scattered light (flat).
    // If cloud cover is high (>85%) and most light is diffuse, it's flat.
    const diffuseRatio = diffuse / total;

    if (cloudCover > 85 && diffuseRatio > 0.8) {
        return "Flat Light";
    }
    if (cloudCover > 60 && diffuseRatio > 0.6) {
        return "Soft / Diffused";
    }
    return "High Contrast";
}

async function fetchRegionalWeather(lat: number, lon: number) {
    const offset = 0.5; // Approx 55km
    const points = [
        { dir: "North", lat: lat + offset, lon: lon },
        { dir: "South", lat: lat - offset, lon: lon },
        { dir: "East", lat: lat, lon: lon + offset }, // rough approximation, ignores converging meridians
        { dir: "West", lat: lat, lon: lon - offset }
    ];

    // Parallel fetch
    const promises = points.map(async (p) => {
        const params = new URLSearchParams({
            latitude: p.lat.toString(),
            longitude: p.lon.toString(),
            current: 'temperature_2m,wind_speed_10m,weather_code',
            hourly: 'visibility',
            wind_speed_unit: 'mph',
            temperature_unit: 'fahrenheit',
            elevation: 'nan'
        });
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
            if (!res.ok) return null;
            const d = await res.json();
            return {
                direction: p.dir,
                temp: d.current.temperature_2m,
                windSpeed: d.current.wind_speed_10m,
                weatherCode: d.current.weather_code,
                condition: decodeWeatherCode(d.current.weather_code),
                elevation: d.elevation,
                visibility: d.hourly.visibility[0]
            };
        } catch (e) {
            console.error(`Failed to fetch regional weather for ${p.dir}`, e);
            return null;
        }
    });

    const results = await Promise.all(promises);
    return results.filter(r => r !== null) as RegionalWeather[];
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
