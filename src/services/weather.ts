import { WeatherData, RegionalWeather, Location } from '@/lib/types';

export const LOCATIONS: Location[] = [
    // --- Alaska ---
    {
        name: 'Cordova, AK (Points North Heli-Adventures)',
        lat: 60.5447,
        lon: -145.7578,
        website: 'https://alaskaheliski.com/',
        description: 'Premier heli-skiing and boarding operation located in Cordova, Alaska, known for its unique access to the southeastern Chugach Mountains.',
        pricing: '$8,850/week (7-night all-inclusive, 4 heli-hours)'
    },
    {
        name: 'Judd Lake, AK (Tordrillo Mountain Lodge)',
        lat: 61.5693,
        lon: -151.5564,
        website: 'https://tordrillomountainlodge.com/',
        description: 'Remote, multi-sport luxury lodge nestled in the heart of Alaska\'s Tordrillo Range, offering world-class heli-skiing.',
        pricing: 'From $18,500/week (7-night all-inclusive, 5 Hobbs hrs)'
    },
    {
        name: 'Girdwood, AK (Chugach Powder Guides)',
        lat: 60.7930,
        lon: -149.1246,
        website: 'https://chugachpowderguides.com/',
        description: 'Offering access to some of the world\'s finest backcountry skiing and snowboarding near Alyeska Resort.',
        pricing: '$1,695–$1,825/day'
    },
    {
        name: 'Valdez, AK (Valdez Heli-Ski Guides)',
        lat: 61.1098,
        lon: -145.7876,
        website: 'https://valdezheliskiguides.com/',
        description: 'Founded in 1993 by Doug and Emily Coombs, offering unparalleled heli-skiing in the Chugach Mountains.',
        pricing: 'From $15,000/week (8-day membership)'
    },
    {
        name: 'Valdez, AK (Black Ops Valdez)',
        lat: 61.0863,
        lon: -146.1360,
        website: 'https://blackopsvaldez.com/',
        description: 'Offering first-class Alaska heli-skiing experiences with deluxe lodging and dining at Robe Lake Lodge.',
        pricing: '$9,750/week (7-night all-inclusive, 5 hrs)'
    },
    {
        name: 'Valdez, AK (Alaska Backcountry Guides)',
        lat: 61.1240,
        lon: -146.3680,
        website: 'https://alaskabackcountryguides.com/',
        description: 'Specializes in providing exceptional and personalized heli-ski and snowboard programs in the Chugach Mountains.',
        pricing: 'From $10,999/week (7-night semi-private, 4 hrs)'
    },
    {
        name: 'Glacier View, AK (Majestic Heli Ski)',
        lat: 61.8190,
        lon: -147.4579,
        website: 'https://majesticheliski.com/',
        description: 'Offers an all-inclusive helicopter skiing and snowboarding adventure in the heart of Alaska\'s Chugach and Talkeetna Mountains.',
        pricing: '~$2,200/day (3–7 day packages)'
    },
    {
        name: 'Haines, AK (SEABA)',
        lat: 59.2358,
        lon: -135.4450,
        website: 'https://seaba-heli.com/',
        description: 'Offers guided heli skiing and snowboarding experiences in Haines, Alaska, providing access to over 250 nautical miles of terrain.',
        pricing: '$9,000–$11,400/week (7-day all-inclusive)'
    },
    {
        name: 'Haines, AK (Alaska Heliskiing)',
        lat: 59.4087,
        lon: -136.0665,
        website: 'https://alaskaheliskiing.com/',
        description: 'Family-run operation dedicated to providing an authentic and affordable heliskiing experience in the Chilkat Range.',
        pricing: '$8,195/week (30 runs); $4,150/4-day'
    },
    {
        name: 'Seward, AK (Silverton Mountain Guides)',
        lat: 60.1042,
        lon: -149.4422,
        website: 'https://silvertonmountainguides.com/',
        description: 'Highly acclaimed luxury private heli-skiing operator accessing vast terrain across multiple Alaskan mountain ranges.',
        pricing: '$8,890/5-day; $9,890/6-day peak'
    },
    {
        name: 'Alyeska Resort, AK (Resort Base)',
        lat: 60.9705,
        lon: -149.0991,
        website: 'https://alyeskaresort.com/',
        description: 'Premier ski resort in Alaska offering lift-access skiing and heli-skiing partnerships.',
        pricing: 'Via partner operators'
    },

    // --- Canada (British Columbia) ---
    {
        name: 'Panorama, BC (RK Heliski)',
        lat: 50.4571,
        lon: -116.2439,
        website: 'https://www.rkheliski.com/',
        description: 'Specializes in daily heliskiing and heliboarding in the Purcell Mountains with over 50 seasons of experience.',
        pricing: 'From ~$1,700 CAD/day (5-run packages)'
    },
    {
        name: 'Bella Coola, BC (Bella Coola Heli Sports)',
        lat: 52.3685,
        lon: -126.1666,
        website: 'https://bellacoolaheliskiing.com/',
        description: 'Premier heli-skiing destination located in the Coast Mountains of British Columbia, renowned for vast terrain.',
        pricing: '$8,980–$13,880 CAD (4–5 night packages)'
    },
    {
        name: 'Revelstoke, BC (Eagle Pass Heli Skiing)',
        lat: 50.9996,
        lon: -118.1957,
        website: 'https://www.eaglepassheli.com/',
        description: 'Known for their "Small Groups. BIG Difference" philosophy, exclusively flying in groups of four.',
        pricing: '$1,590–$2,450 CAD/day; $7,130–$25,860 CAD lodge packages'
    },
    {
        name: 'Revelstoke, BC (Selkirk Tangiers)',
        lat: 51.0000,
        lon: -118.2000,
        website: 'https://www.selkirk-tangiers.com/',
        description: 'Offers an unparalleled heli-skiing experience in Revelstoke with over 45 years of experience.',
        pricing: '$2,049–$3,059 CAD/day; $8,229–$12,129 CAD/4-day'
    },
    {
        name: 'Revelstoke, BC (Eleven Experience)',
        lat: 50.9981,
        lon: -118.1957,
        website: 'https://elevenexperience.com/revelstoke-lodge-winter/',
        description: 'Offers exclusive heli-skiing and year-round adventures from a renovated historic lodge in downtown Revelstoke.',
        pricing: 'From $11,436 USD/night (private group, 1–3 guests)'
    },
    {
        name: 'Gold Bridge, BC (Tyax Lodge & Heliskiing)',
        lat: 50.9500,
        lon: -122.7667,
        website: 'https://tyax.com/',
        description: 'Offers a world-class heliskiing adventure located in the South Chilcotin Mountains with a unique single group format.',
        pricing: '$134,000 CAD/week (private, 1–4 guests)'
    },
    {
        name: 'Golden, BC (Great Canadian Heliskiing)',
        lat: 51.2999,
        lon: -116.9686,
        website: 'https://canadianheli-skiing.com/',
        description: 'Provides heliskiing and heliboarding adventures in the renowned snowbelt between the Rocky and Selkirk Mountains.',
        pricing: 'From $3,998 CAD/2-day; unlimited vertical'
    },
    {
        name: 'Blue River, BC (Mike Wiegele Heli Skiing)',
        lat: 52.1287,
        lon: -119.2818,
        website: 'https://www.wiegele.com/',
        description: 'Pioneering and leading helicopter skiing operation offering an ultimate heliski resort experience since 1970.',
        pricing: '$6,765–$19,411 CAD (3–7 day Deluxe packages)'
    },
    {
        name: 'Stewart, BC (Last Frontier Heliskiing)',
        lat: 55.9431,
        lon: -129.9881,
        website: 'https://lastfrontierheli.com/',
        description: 'Offers exclusive heli-skiing and heli-boarding experiences in the vast, remote mountain ranges of Northern British Columbia.',
        pricing: '$12,440–$18,630 CAD (5–7 day packages)'
    },
    {
        name: 'Terrace, BC (Northern Escape Heli Skiing)',
        lat: 54.5186,
        lon: -128.6044,
        website: 'https://www.neheliskiing.com/',
        description: 'Offers unparalleled heli-skiing and heli-boarding adventures in the remote Skeena Mountains with unlimited vertical.',
        pricing: 'From ~$2,400 USD/day; unlimited vertical'
    },
    {
        name: 'Whistler, BC (Whistler Heli-Skiing)',
        lat: 50.1163,
        lon: -122.9574,
        website: 'https://www.whistlerblackcomb.com/explore-the-resort/activities-and-events/whistler-heli-skiing/whistler-heli-skiing.aspx',
        description: 'Offers access to extensive backcountry areas around Whistler, including the remote Bella Coola region.',
        pricing: 'From ~$1,720 CAD/day (3-run package)'
    },
    {
        name: 'Nelson, BC (Snowwater Heli Skiing)',
        lat: 49.4939,
        lon: -117.2946,
        website: 'https://www.snowwater.com/',
        description: 'Offers an all-inclusive, unlimited vertical heli-skiing and boarding experience in British Columbia\'s Selkirk Mountains.',
        pricing: 'From ~$5,780 CAD (multi-day, unlimited vertical)'
    },

    // --- Lower 48 States ---
    {
        name: 'Mazama, WA (North Cascade Heli)',
        lat: 48.5963,
        lon: -120.4427,
        website: 'https://heli-ski.com/',
        description: 'Premier heli-skiing and heli-boarding operation located in the "American Alps" of the North Cascades.',
        pricing: '$1,850/day (8 runs guaranteed)'
    },
    {
        name: 'Sun Valley, ID (Sun Valley Heli Ski)',
        lat: 43.6971,
        lon: -114.3517,
        website: 'https://sunvalleyheliski.com/',
        description: 'Recognized as the oldest helicopter ski operator in the lower 48 states, offering exclusive access to vast terrain.',
        pricing: '$1,500–$1,900/day (6 runs)'
    },
    {
        name: 'Driggs/Victor, ID (High Mountain Heli)',
        lat: 43.5358,
        lon: -111.1969,
        website: 'https://www.heliskijackson.com/',
        description: 'Offers world-class helicopter skiing adventures in Jackson Hole, Wyoming, with a satellite office near Victor.',
        pricing: '$1,900/day (6 runs, ~12–15k vertical ft)'
    },
    {
        name: 'Jackson, WY (High Mountain Heli - Snake River)',
        lat: 43.2700,
        lon: -110.7800,
        website: 'https://www.heliskijackson.com/',
        description: 'Offers expert-guided heli-ski tours providing the ultimate deep powder helicopter skiing experience.',
        pricing: '$1,900/day (6 runs, ~12–15k vertical ft)'
    },
    {
        name: 'Snowbird, UT (Powderbird)',
        lat: 40.5796,
        lon: -111.6669,
        website: 'https://powderbird.com/',
        description: 'Premier heli-skiing and heli-boarding operation based in Utah, accessing the backcountry of the Wasatch Mountains.',
        pricing: 'From $1,558/day (early bird, 6 laps)'
    },
    {
        name: 'Lamoille, NV (Ruby Mountain Heli)',
        lat: 40.7169,
        lon: -115.4157,
        website: 'https://helicopterskiing.com/',
        description: 'Offers premier helicopter skiing and snowboarding adventures in the Ruby Mountains of northeastern Nevada.',
        pricing: '~$2,091/day; ~$6,593/3-day package'
    },
    {
        name: 'Telluride, CO (Helitrax)',
        lat: 37.9358,
        lon: -107.8340,
        website: 'https://www.helitrax.com/',
        description: 'Colorado\'s ultimate and most experienced helicopter skiing and snowboarding operation.',
        pricing: '$1,975/day (6 runs)'
    },
    {
        name: 'Silverton, CO (Silverton Mountain)',
        lat: 37.8847,
        lon: -107.6653,
        website: 'https://silvertonmountain.com/',
        description: 'Unparalleled destination for advanced and expert skiers seeking an authentic, rugged mountain experience.',
        pricing: '$99/single run; $999–$1,599/6-run day'
    },
    {
        name: 'Bridgeport, CA (Sweetwater Heli)',
        lat: 38.2558,
        lon: -119.2313,
        website: 'https://sweetwater-heli.com/',
        description: 'California\'s only heli-skiing and heli-boarding operation, offering exclusive access to the Sweetwater Mountains.',
        pricing: 'From $1,800/day (6–8 runs)'
    },
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
