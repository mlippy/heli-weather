import { WeatherData, RegionalWeather, Location, Region, TravelEstimate, NearbyResort, TerrainElevation } from '@/lib/types';

export const REGIONS: Region[] = [
    { label: "Alaska", filter: ", AK", borderColor: "border-l-amber-500", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", textColor: "text-amber-400" },
    { label: "British Columbia", filter: ", BC", borderColor: "border-l-sky-400", badge: "bg-sky-500/15 text-sky-400 border-sky-500/30", textColor: "text-sky-400" },
    { label: "Europe - Alps & Scandinavia", filter: "__europe__", borderColor: "border-l-indigo-400", badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30", textColor: "text-indigo-400" },
    { label: "Greenland & Iceland", filter: "__arctic__", borderColor: "border-l-cyan-400", badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30", textColor: "text-cyan-400" },
    { label: "Asia, Japan & Caucasus", filter: "__asia__", borderColor: "border-l-rose-400", badge: "bg-rose-500/15 text-rose-400 border-rose-500/30", textColor: "text-rose-400" },
    { label: "South America - Andes", filter: "__chile__", borderColor: "border-l-rose-600", badge: "bg-rose-600/15 text-rose-500 border-rose-600/30", textColor: "text-rose-500" },
    { label: "New Zealand", filter: "__nz__", borderColor: "border-l-teal-400", badge: "bg-teal-500/15 text-teal-400 border-teal-500/30", textColor: "text-teal-400" },
    { label: "Lower 48 States", filter: "__lower48__", borderColor: "border-l-emerald-400", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", textColor: "text-emerald-400" },
];

export function getRegionForLoc(name: string): Region {
    if (name.includes(", AK")) return REGIONS[0];
    if (name.includes(", BC") || name.includes("Bugaboos")) return REGIONS[1];
    if (name.includes("Switzerland") || name.includes("Italy") || name.includes("Sweden")) return REGIONS[2];
    if (name.includes("Greenland") || name.includes("Iceland")) return REGIONS[3];
    if (name.includes("Japan") || name.includes("India") || name.includes("Nepal") || name.includes("Georgia")) return REGIONS[4];
    if (name.includes("Chile") || name.includes("Patagonia")) return REGIONS[5];
    if (name.includes(", NZ")) return REGIONS[6];
    return REGIONS[7];
}

export function getLocsForRegion(label: string): Location[] {
    if (label === "All") return LOCATIONS;
    if (label === "Alaska") return LOCATIONS.filter(l => l.name.includes(", AK"));
    if (label === "British Columbia") return LOCATIONS.filter(l => l.name.includes(", BC") || l.name.includes("Bugaboos"));
    if (label === "Europe - Alps & Scandinavia") return LOCATIONS.filter(l => l.name.includes("Switzerland") || l.name.includes("Italy") || l.name.includes("Sweden"));
    if (label === "Greenland & Iceland") return LOCATIONS.filter(l => l.name.includes("Greenland") || l.name.includes("Iceland"));
    if (label === "Asia, Japan & Caucasus") return LOCATIONS.filter(l => l.name.includes("Japan") || l.name.includes("India") || l.name.includes("Nepal") || l.name.includes("Georgia"));
    if (label === "South America - Andes") return LOCATIONS.filter(l => l.name.includes("Chile") || l.name.includes("Patagonia"));
    if (label === "New Zealand") return LOCATIONS.filter(l => l.name.includes(", NZ"));
    return LOCATIONS.filter(l =>
        !l.name.includes(", AK") &&
        !l.name.includes(", BC") &&
        !l.name.includes("Bugaboos") &&
        !l.name.includes("Switzerland") &&
        !l.name.includes("Italy") &&
        !l.name.includes("Sweden") &&
        !l.name.includes("Greenland") &&
        !l.name.includes("Iceland") &&
        !l.name.includes("Japan") &&
        !l.name.includes("India") &&
        !l.name.includes("Nepal") &&
        !l.name.includes("Georgia") &&
        !l.name.includes("Chile") &&
        !l.name.includes("Patagonia") &&
        !l.name.includes(", NZ")
    );
}

export const LOCATIONS: Location[] = [
    // --- Alaska ---
    {
        name: 'Cordova, AK (Points North Heli-Adventures)',
        lat: 60.5447,
        lon: -145.7578,
        website: 'https://alaskaheliski.com/',
        description: 'Premier heli-skiing and boarding operation located in Cordova, Alaska, known for its unique access to the southeastern Chugach Mountains.',
        pricing: '$8,850 pp/week (7-night all-inclusive, 4 heli-hrs pp)'
    },
    {
        name: 'Judd Lake, AK (Tordrillo Mountain Lodge)',
        lat: 61.5693,
        lon: -151.5564,
        website: 'https://tordrillomountainlodge.com/',
        description: 'Remote, multi-sport luxury lodge nestled in the heart of Alaska\'s Tordrillo Range, offering world-class heli-skiing.',
        pricing: 'From $21,835 pp/week (7-night all-inclusive, 5 heli excursions)'
    },
    {
        name: 'Girdwood, AK (Chugach Powder Guides)',
        lat: 60.7930,
        lon: -149.1246,
        website: 'https://chugachpowderguides.com/',
        description: 'Offering access to some of the world\'s finest backcountry skiing and snowboarding near Alyeska Resort.',
        pricing: '$1,695–$1,825 pp/day (groups of 4–5)'
    },
    {
        name: 'Valdez, AK (Valdez Heli-Ski Guides)',
        lat: 61.1098,
        lon: -145.7876,
        website: 'https://valdezheliskiguides.com/',
        description: 'Founded in 1993 by Doug and Emily Coombs, offering unparalleled heli-skiing in the Chugach Mountains.',
        pricing: 'From $15,000 pp/week (8-day, groups of 4)'
    },
    {
        name: 'Valdez, AK (Black Ops Valdez)',
        lat: 61.0863,
        lon: -146.1360,
        website: 'https://blackopsvaldez.com/',
        description: 'Offering first-class Alaska heli-skiing experiences with deluxe lodging and dining at Robe Lake Lodge.',
        pricing: '$9,750 pp/week (7-night all-inclusive, 5 hrs, groups of 4)'
    },
    {
        name: 'Valdez, AK (Alaska Backcountry Guides)',
        lat: 61.1240,
        lon: -146.3680,
        website: 'https://alaskabackcountryguides.com/',
        description: 'Specializes in providing exceptional and personalized heli-ski and snowboard programs in the Chugach Mountains.',
        pricing: 'From $10,999 pp/week (7-night, 4 hrs, groups of 4, max 8)'
    },
    {
        name: 'Glacier View, AK (Majestic Heli Ski)',
        lat: 61.8190,
        lon: -147.4579,
        website: 'https://majesticheliski.com/',
        description: 'Offers an all-inclusive helicopter skiing and snowboarding adventure in the heart of Alaska\'s Chugach and Talkeetna Mountains.',
        pricing: '~$2,200 pp/day (3–7 day all-inclusive packages)'
    },
    {
        name: 'Haines, AK (SEABA)',
        lat: 59.2358,
        lon: -135.4450,
        website: 'https://seaba-heli.com/',
        description: 'Offers guided heli skiing and snowboarding experiences in Haines, Alaska, providing access to over 250 nautical miles of terrain.',
        pricing: '$9,000–$11,400 pp/week (7-day all-inclusive, 4 Hobbs hrs)'
    },
    {
        name: 'Haines, AK (Alaska Heliskiing)',
        lat: 59.4087,
        lon: -136.0665,
        website: 'https://alaskaheliskiing.com/',
        description: 'Family-run operation dedicated to providing an authentic and affordable heliskiing experience in the Chilkat Range.',
        pricing: '$8,195 pp/week (30 runs); $4,150 pp/4-day (15 runs)'
    },
    {
        name: 'Seward, AK (Silverton Mountain Guides)',
        lat: 60.1042,
        lon: -149.4422,
        website: 'https://silvertonmountainguides.com/',
        description: 'Highly acclaimed luxury private heli-skiing operator accessing vast terrain across multiple Alaskan mountain ranges.',
        pricing: '$8,890 pp/5-day; $9,890 pp/6-day peak (groups of 4)'
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
        pricing: 'From ~$1,700 CAD pp/day (5-run, groups of 5–10)'
    },
    {
        name: 'Bella Coola, BC (Bella Coola Heli Sports)',
        lat: 52.3685,
        lon: -126.1666,
        website: 'https://bellacoolaheliskiing.com/',
        description: 'Premier heli-skiing destination located in the Coast Mountains of British Columbia, renowned for vast terrain.',
        pricing: '$8,980–$13,880 CAD pp (4–5 night all-inclusive, groups of 4)'
    },
    {
        name: 'Revelstoke, BC (Eagle Pass Heli Skiing)',
        lat: 50.9996,
        lon: -118.1957,
        website: 'https://www.eaglepassheli.com/',
        description: 'Known for their "Small Groups. BIG Difference" philosophy, exclusively flying in groups of four.',
        pricing: '$1,590–$2,450 CAD pp/day; lodge pkgs $7,130–$25,860 CAD pp (groups of 4)'
    },
    {
        name: 'Revelstoke, BC (Selkirk Tangiers)',
        lat: 51.0000,
        lon: -118.2000,
        website: 'https://www.selkirk-tangiers.com/',
        description: 'Offers an unparalleled heli-skiing experience in Revelstoke with over 45 years of experience.',
        pricing: '$2,049–$3,059 CAD pp/day; $8,229–$12,129 CAD pp/4-day (groups of 4–5)'
    },
    {
        name: 'Revelstoke, BC (Eleven Experience)',
        lat: 50.9981,
        lon: -118.1957,
        website: 'https://elevenexperience.com/lodge-destinations/canada/eleven-revelstoke-lodge/heli-ski-season',
        description: 'Offers exclusive heli-skiing and year-round adventures from a renovated historic lodge in downtown Revelstoke.',
        pricing: 'From $11,436 USD/night for group of 1–3 (private heli + guides)'
    },
    {
        name: 'Gold Bridge, BC (Tyax Lodge & Heliskiing)',
        lat: 50.9500,
        lon: -122.7667,
        website: 'https://tyax.com/',
        description: 'Offers a world-class heliskiing adventure located in the South Chilcotin Mountains with a unique single group format.',
        pricing: '$134,000 CAD/week for group of 1–4 (private heli + lodge)'
    },
    {
        name: 'Golden, BC (Great Canadian Heliskiing)',
        lat: 51.2999,
        lon: -116.9686,
        website: 'https://canadianheli-skiing.com/',
        description: 'Provides heliskiing and heliboarding adventures in the renowned snowbelt between the Rocky and Selkirk Mountains.',
        pricing: 'From $3,998 CAD pp/2-day (groups of 4, unlimited vertical)'
    },
    {
        name: 'Blue River, BC (Mike Wiegele Heli Skiing)',
        lat: 52.1287,
        lon: -119.2818,
        website: 'https://www.wiegele.com/',
        description: 'Pioneering and leading helicopter skiing operation offering an ultimate heliski resort experience since 1970.',
        pricing: '$6,765–$19,411 CAD pp (3–7 day Deluxe, groups of 4–11)'
    },
    {
        name: 'Stewart, BC (Last Frontier Heliskiing)',
        lat: 55.9431,
        lon: -129.9881,
        website: 'https://lastfrontierheli.com/',
        description: 'Offers exclusive heli-skiing and heli-boarding experiences in the vast, remote mountain ranges of Northern British Columbia.',
        pricing: '$12,440–$18,630 CAD pp (5–7 day all-inclusive, groups of 4)'
    },
    {
        name: 'Terrace, BC (Northern Escape Heli Skiing)',
        lat: 54.5186,
        lon: -128.6044,
        website: 'https://www.neheliskiing.com/',
        description: 'Offers unparalleled heli-skiing and heli-boarding adventures in the remote Skeena Mountains with unlimited vertical.',
        pricing: 'From ~$2,400 USD pp/day (groups of 4, unlimited vertical)'
    },
    {
        name: 'Whistler, BC (Whistler Heli-Skiing)',
        lat: 50.1163,
        lon: -122.9574,
        website: 'https://www.whistlerblackcomb.com/explore-the-resort/activities-and-events/whistler-heli-skiing/whistler-heli-skiing.aspx',
        description: 'Offers access to extensive backcountry areas around Whistler, including the remote Bella Coola region.',
        pricing: 'From ~$1,720 CAD pp/day (3-run, groups of 4–10)'
    },
    {
        name: 'Nelson, BC (Snowwater Heli Skiing)',
        lat: 49.4939,
        lon: -117.2946,
        website: 'https://www.snowwater.com/',
        description: 'Offers an all-inclusive, unlimited vertical heli-skiing and boarding experience in British Columbia\'s Selkirk Mountains.',
        pricing: 'From ~$5,780 CAD pp (multi-day, groups of 4, unlimited vertical)'
    },
    {
        name: 'Bugaboos, BC (CMH Heli-Skiing)',
        lat: 50.7360,
        lon: -116.7118,
        website: 'https://www.cmhheli.com/',
        description: 'The birthplace of heli-skiing, offering legendary powder across 11 different lodge areas in British Columbia.',
        pricing: 'From ~$2,100 CAD pp/day (3–7 day packages)'
    },

    // --- Europe ---
    {
        name: 'Zermatt, Switzerland (Air Zermatt)',
        lat: 46.0234,
        lon: 7.7523,
        website: 'https://www.air-zermatt.ch/',
        description: 'Legendary alpine heli-skiing in the shadow of the Matterhorn, accessing some of Europe\'s highest glacial terrain.',
        pricing: '~CHF 470 pp/drop (classic, incl. guide)'
    },
    {
        name: 'Aosta Valley, Italy (Valgrisenche Heli-Ski)',
        lat: 45.6030,
        lon: 7.0620,
        website: 'https://heliski-valgrisenche.com/',
        description: 'Authentic Italian heli-skiing in a rugged, high-altitude valley known for exceptional snow quality and empty slopes.',
        pricing: '~$320 EUR pp/drop; full day ~$1,100 EUR'
    },
    {
        name: 'Riksgränsen, Sweden (Arctic Elements)',
        lat: 68.4285,
        lon: 18.1221,
        website: 'https://arcticelements.com/',
        description: 'Exclusive heli-skiing deep within the Swedish Arctic Circle, offering mid-night sun sessions in late spring.',
        pricing: 'From ~$1,450 EUR pp/day (multi-day packages)'
    },
    {
        name: 'Dalvik, Iceland (Arctic Heli Skiing)',
        lat: 65.9700,
        lon: -18.5300,
        website: 'https://www.arcticheliskiing.com/',
        description: 'Iceland\'s original heli-ski operator, pioneering the industry on the Troll Peninsula.',
        pricing: 'From ~$1,800 EUR pp/day'
    },
    {
        name: 'Siglufjörður, Iceland (Summit Heliskiing)',
        lat: 66.1500,
        lon: -18.9100,
        website: 'https://summitheliskiing.is/',
        description: 'Premier heli-skiing and ski touring experiences based in the spectacular Troll Peninsula.',
        pricing: 'From ~$1,750 EUR pp/day'
    },
    {
        name: 'Siglufjörður, Iceland (Viking Heli Skiing)',
        lat: 66.1517,
        lon: -18.9089,
        website: 'https://vikingheliskiing.com/',
        description: 'Specializes in boutique heli-skiing and snowboarding adventures in the Troll Peninsula.',
        pricing: 'From ~€1,900 pp/day'
    },
    {
        name: 'Kulusuk, Greenland (Greenland Heliskiing)',
        lat: 65.5700,
        lon: -37.1900,
        website: 'https://greenlandheliskiing.com/',
        description: 'Exclusive heli-skiing on the East Coast of Greenland, based in Kulusuk, offering descents to the ocean amidst icebergs.',
        pricing: '~€13,800 pp/week (group of 4)'
    },
    {
        name: 'Maniitsoq, Greenland (Heliskigreenland)',
        lat: 65.4200,
        lon: -52.8900,
        website: 'https://heliskigreenland.com/',
        description: 'Arctic heli-skiing and ski touring in West Greenland, often utilizing the ship "Tulu" for access to diverse terrain.',
        pricing: 'From ~€12,950 pp/week (Classic; Private ~€11,800)'
    },

    // --- Asia, Japan & Caucasus ---
    {
        name: 'Niseko, Japan (Hokkaido Backcountry Club)',
        lat: 42.8048,
        lon: 140.6874,
        website: 'https://hokkaidobackcountryclub.com/',
        description: 'Accessing world-famous "Deep Japow" on Mount Shiribetsu with breathtaking views and incredible tree skiing.',
        pricing: '~$1,250 USD pp/day (6 runs)'
    },
    {
        name: 'Manali, India (Himalaya Heli Ski)',
        lat: 32.2432,
        lon: 77.1892,
        website: 'https://himalayaheliski.com/',
        description: 'High-altitude Himalayan heli-skiing in the Kullu Valley, featuring massive vertical drops and unique cultural experiences.',
        pricing: '~$2,650 USD pp/day; $15,000 USD/week'
    },
    {
        name: 'Annapurna Range, Nepal (Himalayan Heliski)',
        lat: 28.5300,
        lon: 83.8400,
        website: 'https://www.himalayanheliski.com/',
        description: 'Extreme high-altitude heli-skiing in the shadow of the world\'s highest peaks, providing once-in-a-lifetime descents.',
        pricing: 'Contact for pricing (Expedition style)'
    },
    {
        name: 'Svaneti, Georgia (Svaneti Heliskiing)',
        lat: 43.0441,
        lon: 42.7246,
        website: 'https://www.svanetiheliskiing.com/',
        description: 'Spectacular heli-skiing in the Greater Caucasus, based in the medieval mountain region of Svaneti with access to untracked alpine terrain.',
        pricing: '~€6,500 pp/week (7-day semi-private, all-incl); heli day ~€10,000/group (max 8)'
    },

    // --- South America ---
    {
        name: 'Santiago/Andes, Chile (Powder South)',
        lat: -33.4489,
        lon: -70.6693,
        website: 'https://heliskiguides.com/',
        description: 'The Andes\' leading private heli-ski operation, accessing vast high-altitude terrain directly from Santiago or luxury lodges.',
        pricing: 'From $1,500 USD pp/day'
    },
    {
        name: 'Valle Nevado, Chile (Valle Nevado Heli-Ski)',
        lat: -33.3547,
        lon: -70.2498,
        website: 'https://vallenevado.com/',
        description: 'Guided heli-skiing adventures from Valle Nevado resort, accessing extensive high-altitude terrain in the central Andes.',
        pricing: '~$1,277 USD pp (2 runs, group of 4)'
    },
    {
        name: 'Patagonia, Chile (Rio Palena Lodge)',
        lat: -43.6100,
        lon: -71.8100,
        website: 'https://elevenexperience.com/lodge-destinations/chile/eleven-rio-palena-lodge',
        description: 'Remote luxury lodge in Northern Patagonia offering exclusive heli-skiing in untapped, pristine mountain ranges.',
        pricing: 'From $2,250 USD pp/day (all-inclusive)'
    },
    {
        name: 'Puma Lodge, Chile (Powder South)',
        lat: -34.3600,
        lon: -70.3100,
        website: 'https://heliskiguides.com/heliski-trips/puma-lodge/',
        description: 'World-class heli-skiing from a 5-star lodge in the Andes, offering vast terrain and luxury amenities.',
        pricing: 'From $9,500 pp (3-day, groups of 8)'
    },
    {
        name: 'Portillo, Chile (Ski Portillo Heli)',
        lat: -32.8850,
        lon: -70.1340,
        website: 'https://skiportillo.com/',
        description: 'Iconic ski resort offering single-run or multi-run heliskiing packages in the high Andes.',
        pricing: '$480 USD (1st run), $240 USD (subsequent runs)'
    },

    // --- New Zealand ---
    {
        name: 'Queenstown, NZ (Harris Mountains Heli-Ski)',
        lat: -44.8529,
        lon: 168.8826,
        website: 'https://www.heliski.co.nz/',
        description: 'New Zealand\'s premier heli-ski operator, providing access to extensive terrain across the Southern Alps.',
        pricing: '~$1,150 NZD pp/day (3–4 runs)'
    },

    // --- Lower 48 States ---
    {
        name: 'Mazama, WA (North Cascade Heli)',
        lat: 48.5963,
        lon: -120.4427,
        website: 'https://heli-ski.com/',
        description: 'Premier heli-skiing and heli-boarding operation located in the "American Alps" of the North Cascades.',
        pricing: '$1,950 pp/day (8 runs guaranteed, groups of 4)'
    },
    {
        name: 'Sun Valley, ID (Sun Valley Heli Ski)',
        lat: 43.6971,
        lon: -114.3517,
        website: 'https://sunvalleyheliski.com/',
        description: 'Recognized as the oldest helicopter ski operator in the lower 48 states, offering exclusive access to vast terrain.',
        pricing: '$1,500–$1,900 pp/day (6 runs, groups of 4)'
    },
    {
        name: 'Driggs/Victor, ID (High Mountain Heli)',
        lat: 43.5358,
        lon: -111.1969,
        website: 'https://www.heliskijackson.com/',
        description: 'Offers world-class helicopter skiing adventures in Jackson Hole, Wyoming, with a satellite office near Victor.',
        pricing: '$1,900 pp/day (6 runs, groups of 4, ~12–15k vert ft)'
    },
    {
        name: 'Jackson, WY (High Mountain Heli - Snake River)',
        lat: 43.2700,
        lon: -110.7800,
        website: 'https://www.heliskijackson.com/',
        description: 'Offers expert-guided heli-ski tours providing the ultimate deep powder helicopter skiing experience.',
        pricing: '$1,900 pp/day (6 runs, groups of 4, ~12–15k vert ft)'
    },
    {
        name: 'Snowbird, UT (Powderbird)',
        lat: 40.5796,
        lon: -111.6669,
        website: 'https://powderbird.com/',
        description: 'Premier heli-skiing and heli-boarding operation based in Utah, accessing the backcountry of the Wasatch Mountains.',
        pricing: 'From $1,558 pp/day (early bird, 6 laps, groups of 4)'
    },
    {
        name: 'Lamoille, NV (Ruby Mountain Heli)',
        lat: 40.7169,
        lon: -115.4157,
        website: 'https://helicopterskiing.com/',
        description: 'Offers premier helicopter skiing and snowboarding adventures in the Ruby Mountains of northeastern Nevada.',
        pricing: '~$2,091 pp/day; ~$6,593 pp/3-day (groups of 4)'
    },
    {
        name: 'Telluride, CO (Helitrax)',
        lat: 37.9358,
        lon: -107.8340,
        website: 'https://www.helitrax.com/',
        description: 'Colorado\'s ultimate and most experienced helicopter skiing and snowboarding operation.',
        pricing: '$1,975 pp/day (6 runs, groups of 4)'
    },
    {
        name: 'Silverton, CO (Silverton Mountain)',
        lat: 37.8847,
        lon: -107.6653,
        website: 'https://silvertonmountain.com/',
        description: 'Unparalleled destination for advanced and expert skiers seeking an authentic, rugged mountain experience.',
        pricing: '$199 pp/single run; $1,290 pp/6-run day'
    },
    {
        name: 'Bridgeport, CA (Sweetwater Heli)',
        lat: 38.2558,
        lon: -119.2313,
        website: 'https://sweetwater-heli.com/',
        description: 'California\'s only heli-skiing and heli-boarding operation, offering exclusive access to the Sweetwater Mountains.',
        pricing: 'From $1,800 pp/day (6–8 runs, small groups)'
    },
];

// Approximate door-to-mountain travel time from the Washington, DC area,
// keyed by the operator's `name`. Origin is whichever of BWI or IAD yields the
// shorter total — BWI for most domestic routes, IAD (United hub) for
// international/long-haul. Values are best-effort estimates that include a
// typical connection; `flightHours` is elapsed air travel and `driveHours` is
// the ground transfer from the arrival airport to the operator base. Verify
// against real itineraries before booking.
export const TRAVEL_TIMES: Record<string, TravelEstimate> = {
    // --- Alaska (via SEA/ANC) ---
    'Cordova, AK (Points North Heli-Adventures)': { origin: 'BWI', destAirport: 'CDV', flightHours: 12.0, driveHours: 0.3 },
    'Judd Lake, AK (Tordrillo Mountain Lodge)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 0.5 },
    'Girdwood, AK (Chugach Powder Guides)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 0.75 },
    'Valdez, AK (Valdez Heli-Ski Guides)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 5.5 },
    'Valdez, AK (Black Ops Valdez)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 5.5 },
    'Valdez, AK (Alaska Backcountry Guides)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 5.5 },
    'Glacier View, AK (Majestic Heli Ski)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 2.0 },
    'Haines, AK (SEABA)': { origin: 'BWI', destAirport: 'JNU', flightHours: 11.0, driveHours: 0.5 },
    'Haines, AK (Alaska Heliskiing)': { origin: 'BWI', destAirport: 'JNU', flightHours: 11.0, driveHours: 0.5 },
    'Seward, AK (Silverton Mountain Guides)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 2.5 },
    'Alyeska Resort, AK (Resort Base)': { origin: 'BWI', destAirport: 'ANC', flightHours: 10.0, driveHours: 0.75 },

    // --- British Columbia (via YVR/YYC) ---
    'Panorama, BC (RK Heliski)': { origin: 'IAD', destAirport: 'YYC', flightHours: 8.0, driveHours: 3.0 },
    'Bella Coola, BC (Bella Coola Heli Sports)': { origin: 'IAD', destAirport: 'YVR', flightHours: 8.5, driveHours: 0.5 },
    'Revelstoke, BC (Eagle Pass Heli Skiing)': { origin: 'IAD', destAirport: 'YLW', flightHours: 9.0, driveHours: 2.5 },
    'Revelstoke, BC (Selkirk Tangiers)': { origin: 'IAD', destAirport: 'YLW', flightHours: 9.0, driveHours: 2.5 },
    'Revelstoke, BC (Eleven Experience)': { origin: 'IAD', destAirport: 'YLW', flightHours: 9.0, driveHours: 2.5 },
    'Gold Bridge, BC (Tyax Lodge & Heliskiing)': { origin: 'IAD', destAirport: 'YVR', flightHours: 8.5, driveHours: 4.5 },
    'Golden, BC (Great Canadian Heliskiing)': { origin: 'IAD', destAirport: 'YYC', flightHours: 8.0, driveHours: 2.75 },
    'Blue River, BC (Mike Wiegele Heli Skiing)': { origin: 'IAD', destAirport: 'YKA', flightHours: 9.5, driveHours: 2.0 },
    'Stewart, BC (Last Frontier Heliskiing)': { origin: 'IAD', destAirport: 'YXT', flightHours: 11.0, driveHours: 3.5 },
    'Terrace, BC (Northern Escape Heli Skiing)': { origin: 'IAD', destAirport: 'YXT', flightHours: 11.0, driveHours: 0.75 },
    'Whistler, BC (Whistler Heli-Skiing)': { origin: 'IAD', destAirport: 'YVR', flightHours: 8.5, driveHours: 2.0 },
    'Nelson, BC (Snowwater Heli Skiing)': { origin: 'IAD', destAirport: 'YCG', flightHours: 10.0, driveHours: 1.0 },
    'Bugaboos, BC (CMH Heli-Skiing)': { origin: 'IAD', destAirport: 'YYC', flightHours: 8.0, driveHours: 4.0 },

    // --- Europe ---
    'Zermatt, Switzerland (Air Zermatt)': { origin: 'IAD', destAirport: 'ZRH', flightHours: 8.0, driveHours: 3.5 },
    'Aosta Valley, Italy (Valgrisenche Heli-Ski)': { origin: 'IAD', destAirport: 'GVA', flightHours: 9.0, driveHours: 2.0 },
    'Riksgränsen, Sweden (Arctic Elements)': { origin: 'IAD', destAirport: 'KRN', flightHours: 13.0, driveHours: 1.5 },
    'Dalvik, Iceland (Arctic Heli Skiing)': { origin: 'IAD', destAirport: 'AEY', flightHours: 9.0, driveHours: 0.75 },
    'Siglufjörður, Iceland (Summit Heliskiing)': { origin: 'IAD', destAirport: 'AEY', flightHours: 9.0, driveHours: 1.5 },
    'Siglufjörður, Iceland (Viking Heli Skiing)': { origin: 'IAD', destAirport: 'AEY', flightHours: 9.0, driveHours: 1.5 },
    'Kulusuk, Greenland (Greenland Heliskiing)': { origin: 'IAD', destAirport: 'KUS', flightHours: 12.0, driveHours: 0.3 },
    'Maniitsoq, Greenland (Heliskigreenland)': { origin: 'IAD', destAirport: 'JSU', flightHours: 16.0, driveHours: 0.3 },

    // --- Asia, Japan & Caucasus ---
    'Niseko, Japan (Hokkaido Backcountry Club)': { origin: 'IAD', destAirport: 'CTS', flightHours: 17.0, driveHours: 2.5 },
    'Manali, India (Himalaya Heli Ski)': { origin: 'IAD', destAirport: 'KUU', flightHours: 18.0, driveHours: 1.5 },
    'Annapurna Range, Nepal (Himalayan Heliski)': { origin: 'IAD', destAirport: 'KTM', flightHours: 18.0, driveHours: 0.5 },
    'Svaneti, Georgia (Svaneti Heliskiing)': { origin: 'IAD', destAirport: 'TBS', flightHours: 15.0, driveHours: 5.0 },

    // --- South America ---
    'Santiago/Andes, Chile (Powder South)': { origin: 'IAD', destAirport: 'SCL', flightHours: 12.0, driveHours: 1.5 },
    'Valle Nevado, Chile (Valle Nevado Heli-Ski)': { origin: 'IAD', destAirport: 'SCL', flightHours: 12.0, driveHours: 2.0 },
    'Patagonia, Chile (Rio Palena Lodge)': { origin: 'IAD', destAirport: 'BBA', flightHours: 16.0, driveHours: 3.0 },
    'Puma Lodge, Chile (Powder South)': { origin: 'IAD', destAirport: 'SCL', flightHours: 12.0, driveHours: 3.0 },
    'Portillo, Chile (Ski Portillo Heli)': { origin: 'IAD', destAirport: 'SCL', flightHours: 12.0, driveHours: 2.5 },

    // --- New Zealand ---
    'Queenstown, NZ (Harris Mountains Heli-Ski)': { origin: 'IAD', destAirport: 'ZQN', flightHours: 22.0, driveHours: 0.5 },

    // --- Lower 48 States ---
    'Mazama, WA (North Cascade Heli)': { origin: 'BWI', destAirport: 'SEA', flightHours: 6.0, driveHours: 4.0 },
    'Sun Valley, ID (Sun Valley Heli Ski)': { origin: 'BWI', destAirport: 'SUN', flightHours: 8.5, driveHours: 0.5 },
    'Driggs/Victor, ID (High Mountain Heli)': { origin: 'BWI', destAirport: 'JAC', flightHours: 8.0, driveHours: 1.25 },
    'Jackson, WY (High Mountain Heli - Snake River)': { origin: 'BWI', destAirport: 'JAC', flightHours: 8.0, driveHours: 0.5 },
    'Snowbird, UT (Powderbird)': { origin: 'BWI', destAirport: 'SLC', flightHours: 4.5, driveHours: 0.75 },
    'Lamoille, NV (Ruby Mountain Heli)': { origin: 'BWI', destAirport: 'EKO', flightHours: 8.0, driveHours: 0.75 },
    'Telluride, CO (Helitrax)': { origin: 'BWI', destAirport: 'MTJ', flightHours: 7.0, driveHours: 1.5 },
    'Silverton, CO (Silverton Mountain)': { origin: 'BWI', destAirport: 'DRO', flightHours: 7.5, driveHours: 1.0 },
    'Bridgeport, CA (Sweetwater Heli)': { origin: 'BWI', destAirport: 'RNO', flightHours: 7.5, driveHours: 2.0 },
};

export function getTravelEstimate(name: string): TravelEstimate | undefined {
    return TRAVEL_TIMES[name];
}

// Format a decimal-hours value as "12h 30m" / "8h" / "45m".
export function formatHours(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

// Two closest major/notable lift-served resorts to each operator base, with
// approximate drive time from the base, keyed by operator `name`. For "down-day"
// resort skiing when you're not flying. Best-effort estimates; a few remote bases
// (Greenland, Nepal, Bella Coola, Rio Palena) have no lift-served resort nearby.
export const NEARBY_RESORTS: Record<string, NearbyResort[]> = {
    'Cordova, AK (Points North Heli-Adventures)': [
        { resort: 'Mt. Eyak Ski Area', driveHours: 0.15 },
        { resort: 'Alyeska Resort', driveHours: 1.0, note: 'Cordova not road-connected; ferry/flight required' },
    ],
    'Judd Lake, AK (Tordrillo Mountain Lodge)': [
        { resort: 'Hilltop Ski Area', driveHours: 0.5, note: 'fly-in lodge; via Anchorage' },
        { resort: 'Alyeska Resort', driveHours: 1.0, note: 'via Anchorage' },
    ],
    'Girdwood, AK (Chugach Powder Guides)': [
        { resort: 'Alyeska Resort', driveHours: 0.1 },
        { resort: 'Hilltop Ski Area', driveHours: 0.75 },
    ],
    'Valdez, AK (Valdez Heli-Ski Guides)': [
        { resort: 'Hilltop Ski Area', driveHours: 5.5, note: 'no resort in Valdez; nearest is Anchorage' },
        { resort: 'Alyeska Resort', driveHours: 6.0 },
    ],
    'Valdez, AK (Black Ops Valdez)': [
        { resort: 'Hilltop Ski Area', driveHours: 5.5, note: 'no resort in Valdez; nearest is Anchorage' },
        { resort: 'Alyeska Resort', driveHours: 6.0 },
    ],
    'Valdez, AK (Alaska Backcountry Guides)': [
        { resort: 'Hilltop Ski Area', driveHours: 5.5, note: 'no resort in Valdez; nearest is Anchorage' },
        { resort: 'Alyeska Resort', driveHours: 6.0 },
    ],
    'Glacier View, AK (Majestic Heli Ski)': [
        { resort: 'Skeetawk Ski Area', driveHours: 1.5 },
        { resort: 'Alyeska Resort', driveHours: 2.75 },
    ],
    'Haines, AK (SEABA)': [
        { resort: 'Eaglecrest Ski Area', driveHours: 5.0, note: 'in Juneau; ferry required, not drivable' },
        { resort: 'Mount Sima', driveHours: 5.0, note: 'near Whitehorse, Yukon; border crossing' },
    ],
    'Haines, AK (Alaska Heliskiing)': [
        { resort: 'Eaglecrest Ski Area', driveHours: 5.0, note: 'in Juneau; ferry required, not drivable' },
        { resort: 'Mount Sima', driveHours: 5.0, note: 'near Whitehorse, Yukon; border crossing' },
    ],
    'Seward, AK (Silverton Mountain Guides)': [
        { resort: 'Alyeska Resort', driveHours: 1.8 },
        { resort: 'Hilltop Ski Area', driveHours: 2.3 },
    ],
    'Alyeska Resort, AK (Resort Base)': [
        { resort: 'Alyeska Resort', driveHours: 0.0 },
        { resort: 'Hilltop Ski Area', driveHours: 0.75 },
    ],
    'Panorama, BC (RK Heliski)': [
        { resort: 'Panorama Mountain Resort', driveHours: 0.1 },
        { resort: 'Kicking Horse Mountain Resort', driveHours: 1.5 },
    ],
    'Bella Coola, BC (Bella Coola Heli Sports)': [],
    'Revelstoke, BC (Eagle Pass Heli Skiing)': [
        { resort: 'Revelstoke Mountain Resort', driveHours: 0.2 },
        { resort: 'Kicking Horse Mountain Resort', driveHours: 1.8 },
    ],
    'Revelstoke, BC (Selkirk Tangiers)': [
        { resort: 'Revelstoke Mountain Resort', driveHours: 0.2 },
        { resort: 'Kicking Horse Mountain Resort', driveHours: 1.8 },
    ],
    'Revelstoke, BC (Eleven Experience)': [
        { resort: 'Revelstoke Mountain Resort', driveHours: 0.2 },
        { resort: 'Kicking Horse Mountain Resort', driveHours: 1.8 },
    ],
    'Gold Bridge, BC (Tyax Lodge & Heliskiing)': [{ resort: 'Whistler Blackcomb', driveHours: 4.0, note: 'long remote winter route via Duffey Lake Rd' }],
    'Golden, BC (Great Canadian Heliskiing)': [
        { resort: 'Kicking Horse Mountain Resort', driveHours: 0.3 },
        { resort: 'Lake Louise Ski Resort', driveHours: 1.3 },
    ],
    'Blue River, BC (Mike Wiegele Heli Skiing)': [
        { resort: 'Marmot Basin (Jasper)', driveHours: 2.7 },
        { resort: 'Sun Peaks Resort', driveHours: 3.0 },
    ],
    'Stewart, BC (Last Frontier Heliskiing)': [{ resort: 'Hudson Bay Mountain Resort (Smithers)', driveHours: 4.5, note: 'reachable within a day but far' }],
    'Terrace, BC (Northern Escape Heli Skiing)': [
        { resort: 'Shames Mountain', driveHours: 0.6 },
        { resort: 'Hudson Bay Mountain Resort (Smithers)', driveHours: 2.5 },
    ],
    'Whistler, BC (Whistler Heli-Skiing)': [
        { resort: 'Whistler Blackcomb', driveHours: 0.1 },
        { resort: 'Cypress Mountain', driveHours: 2.0 },
    ],
    'Nelson, BC (Snowwater Heli Skiing)': [
        { resort: 'Whitewater Ski Resort', driveHours: 0.4 },
        { resort: 'RED Mountain Resort (Rossland)', driveHours: 2.0 },
    ],
    'Bugaboos, BC (CMH Heli-Skiing)': [
        { resort: 'Kicking Horse Mountain Resort', driveHours: 0.3, note: 'from Golden staging; lodge is fly-in only' },
        { resort: 'Lake Louise Ski Resort', driveHours: 0.7, note: 'from Banff/Lake Louise staging' },
    ],
    'Zermatt, Switzerland (Air Zermatt)': [
        { resort: 'Zermatt (own ski area)', driveHours: 0, note: 'car-free; cog railway & lifts' },
        { resort: 'Breuil-Cervinia (Italy)', driveHours: 3.0, note: 'ski-connected in ~1h on snow; ~3h by road' },
    ],
    'Aosta Valley, Italy (Valgrisenche Heli-Ski)': [
        { resort: 'Pila (Aosta)', driveHours: 0.75 },
        { resort: 'La Thuile', driveHours: 0.9 },
    ],
    'Riksgränsen, Sweden (Arctic Elements)': [
        { resort: 'Riksgränsen (own ski area)', driveHours: 0, note: 'lift-served resort at the base' },
        { resort: 'Björkliden', driveHours: 0.15, note: 'free shuttle, shared pass' },
    ],
    'Dalvik, Iceland (Arctic Heli Skiing)': [
        { resort: 'Böggvisstaðafjall (Dalvík)', driveHours: 0.1 },
        { resort: 'Hlíðarfjall (Akureyri)', driveHours: 0.67, note: 'largest resort in N. Iceland' },
    ],
    'Siglufjörður, Iceland (Summit Heliskiing)': [
        { resort: 'Skarðsdalur (Siglufjörður)', driveHours: 0.1 },
        { resort: 'Hlíðarfjall (Akureyri)', driveHours: 1.15 },
    ],
    'Siglufjörður, Iceland (Viking Heli Skiing)': [
        { resort: 'Skarðsdalur (Siglufjörður)', driveHours: 0.1 },
        { resort: 'Hlíðarfjall (Akureyri)', driveHours: 1.15 },
    ],
    'Kulusuk, Greenland (Greenland Heliskiing)': [],
    'Maniitsoq, Greenland (Heliskigreenland)': [],
    'Niseko, Japan (Hokkaido Backcountry Club)': [
        { resort: 'Niseko United', driveHours: 0.1 },
        { resort: 'Rusutsu Resort', driveHours: 0.6 },
    ],
    'Manali, India (Himalaya Heli Ski)': [
        { resort: 'Solang Valley', driveHours: 0.5 },
        { resort: 'Narkanda', driveHours: 4.5, note: 'next nearest lift-served area, ~200 km' },
    ],
    'Annapurna Range, Nepal (Himalayan Heliski)': [],
    'Svaneti, Georgia (Svaneti Heliskiing)': [
        { resort: 'Hatsvali', driveHours: 0.25 },
        { resort: 'Tetnuldi', driveHours: 1.0, note: 'rough road, 4x4 in winter' },
    ],
    'Santiago/Andes, Chile (Powder South)': [
        { resort: 'Valle Nevado', driveHours: 1.5 },
        { resort: 'El Colorado', driveHours: 1.5, note: 'La Parva equally close' },
    ],
    'Valle Nevado, Chile (Valle Nevado Heli-Ski)': [
        { resort: 'El Colorado', driveHours: 0.5 },
        { resort: 'La Parva', driveHours: 0.75 },
    ],
    'Patagonia, Chile (Rio Palena Lodge)': [],
    'Puma Lodge, Chile (Powder South)': [{ resort: 'Chapa Verde', driveHours: 2.0, note: 'no private cars; mandatory shuttle from Rancagua' }],
    'Portillo, Chile (Ski Portillo Heli)': [
        { resort: 'El Colorado', driveHours: 3.5, note: 'via Santiago' },
        { resort: 'Valle Nevado', driveHours: 3.5, note: 'via Santiago; Portillo base has on-site lifts' },
    ],
    'Queenstown, NZ (Harris Mountains Heli-Ski)': [
        { resort: 'Coronet Peak', driveHours: 0.4 },
        { resort: 'The Remarkables', driveHours: 0.75 },
    ],
    'Mazama, WA (North Cascade Heli)': [
        { resort: 'Loup Loup Ski Bowl', driveHours: 0.8, note: 'small, limited operations' },
        { resort: 'Mission Ridge', driveHours: 2.5, note: 'nearest full-size resort' },
    ],
    'Sun Valley, ID (Sun Valley Heli Ski)': [
        { resort: 'Sun Valley (Bald Mountain)', driveHours: 0.15 },
        { resort: 'Soldier Mountain', driveHours: 1.0, note: 'small, limited days' },
    ],
    'Driggs/Victor, ID (High Mountain Heli)': [
        { resort: 'Grand Targhee', driveHours: 0.5 },
        { resort: 'Jackson Hole Mountain Resort', driveHours: 0.9, note: 'over Teton Pass; can close in storms' },
    ],
    'Jackson, WY (High Mountain Heli - Snake River)': [
        { resort: 'Snow King', driveHours: 0.1, note: 'in-town hill' },
        { resort: 'Jackson Hole Mountain Resort', driveHours: 0.4 },
    ],
    'Snowbird, UT (Powderbird)': [
        { resort: 'Alta', driveHours: 0.1 },
        { resort: 'Brighton / Solitude', driveHours: 0.6 },
    ],
    'Lamoille, NV (Ruby Mountain Heli)': [
        { resort: 'Elko Snobowl', driveHours: 0.6, note: 'tiny weekend community hill' },
        { resort: 'Pomerelle', driveHours: 2.2, note: 'nearest small lift resort' },
    ],
    'Telluride, CO (Helitrax)': [
        { resort: 'Telluride Ski Resort', driveHours: 0.15 },
        { resort: 'Purgatory (Durango)', driveHours: 2.2 },
    ],
    'Silverton, CO (Silverton Mountain)': [
        { resort: 'Purgatory (Durango)', driveHours: 0.9 },
        { resort: 'Telluride Ski Resort', driveHours: 1.7 },
    ],
    'Bridgeport, CA (Sweetwater Heli)': [
        { resort: 'June Mountain', driveHours: 0.9 },
        { resort: 'Mammoth Mountain', driveHours: 1.3 },
    ],
};

export function getNearbyResorts(name: string): NearbyResort[] {
    return NEARBY_RESORTS[name] ?? [];
}

// Approximate skiable terrain elevation range (feet) for each operator's heli
// terrain: base = typical lowest skiing / valley pickup, peak = highest skiable
// summit or drop-off. Best-effort figures; some operators publish exact ranges,
// others are estimated from range topography and published vertical drops.
export const TERRAIN_ELEVATION: Record<string, TerrainElevation> = {
    'Cordova, AK (Points North Heli-Adventures)': { baseFt: 1000, peakFt: 7000 },
    'Judd Lake, AK (Tordrillo Mountain Lodge)': { baseFt: 2000, peakFt: 7500 },
    'Girdwood, AK (Chugach Powder Guides)': { baseFt: 1000, peakFt: 6500 },
    'Valdez, AK (Valdez Heli-Ski Guides)': { baseFt: 1000, peakFt: 7000 },
    'Valdez, AK (Black Ops Valdez)': { baseFt: 1500, peakFt: 7000 },
    'Valdez, AK (Alaska Backcountry Guides)': { baseFt: 1500, peakFt: 8500 },
    'Glacier View, AK (Majestic Heli Ski)': { baseFt: 2500, peakFt: 10000 },
    'Haines, AK (SEABA)': { baseFt: 500, peakFt: 6500 },
    'Haines, AK (Alaska Heliskiing)': { baseFt: 500, peakFt: 7000 },
    'Seward, AK (Silverton Mountain Guides)': { baseFt: 500, peakFt: 5500 },
    'Alyeska Resort, AK (Resort Base)': { baseFt: 250, peakFt: 3939 },
    'Panorama, BC (RK Heliski)': { baseFt: 4500, peakFt: 11000 },
    'Bella Coola, BC (Bella Coola Heli Sports)': { baseFt: 500, peakFt: 9500 },
    'Revelstoke, BC (Eagle Pass Heli Skiing)': { baseFt: 3000, peakFt: 8500 },
    'Revelstoke, BC (Selkirk Tangiers)': { baseFt: 2600, peakFt: 9500 },
    'Revelstoke, BC (Eleven Experience)': { baseFt: 2600, peakFt: 9000 },
    'Gold Bridge, BC (Tyax Lodge & Heliskiing)': { baseFt: 3300, peakFt: 9000 },
    'Golden, BC (Great Canadian Heliskiing)': { baseFt: 5500, peakFt: 10100 },
    'Blue River, BC (Mike Wiegele Heli Skiing)': { baseFt: 3400, peakFt: 11600 },
    'Stewart, BC (Last Frontier Heliskiing)': { baseFt: 1000, peakFt: 7500 },
    'Terrace, BC (Northern Escape Heli Skiing)': { baseFt: 1480, peakFt: 8040 },
    'Whistler, BC (Whistler Heli-Skiing)': { baseFt: 4500, peakFt: 9000 },
    'Nelson, BC (Snowwater Heli Skiing)': { baseFt: 4000, peakFt: 9400 },
    'Bugaboos, BC (CMH Heli-Skiing)': { baseFt: 3100, peakFt: 10000 },
    'Zermatt, Switzerland (Air Zermatt)': { baseFt: 5500, peakFt: 13940 },
    'Aosta Valley, Italy (Valgrisenche Heli-Ski)': { baseFt: 5600, peakFt: 12470 },
    'Riksgränsen, Sweden (Arctic Elements)': { baseFt: 1600, peakFt: 6890 },
    'Dalvik, Iceland (Arctic Heli Skiing)': { baseFt: 0, peakFt: 4920 },
    'Siglufjörður, Iceland (Summit Heliskiing)': { baseFt: 0, peakFt: 5050 },
    'Siglufjörður, Iceland (Viking Heli Skiing)': { baseFt: 0, peakFt: 5000 },
    'Kulusuk, Greenland (Greenland Heliskiing)': { baseFt: 0, peakFt: 6560 },
    'Maniitsoq, Greenland (Heliskigreenland)': { baseFt: 0, peakFt: 6560 },
    'Niseko, Japan (Hokkaido Backcountry Club)': { baseFt: 1500, peakFt: 3632 },
    'Manali, India (Himalaya Heli Ski)': { baseFt: 8200, peakFt: 16000 },
    'Annapurna Range, Nepal (Himalayan Heliski)': { baseFt: 10800, peakFt: 17400 },
    'Svaneti, Georgia (Svaneti Heliskiing)': { baseFt: 7500, peakFt: 13100 },
    'Santiago/Andes, Chile (Powder South)': { baseFt: 8200, peakFt: 14800 },
    'Valle Nevado, Chile (Valle Nevado Heli-Ski)': { baseFt: 8200, peakFt: 15000 },
    'Patagonia, Chile (Rio Palena Lodge)': { baseFt: 2500, peakFt: 7000 },
    'Puma Lodge, Chile (Powder South)': { baseFt: 8200, peakFt: 14800 },
    'Portillo, Chile (Ski Portillo Heli)': { baseFt: 8400, peakFt: 13900 },
    'Queenstown, NZ (Harris Mountains Heli-Ski)': { baseFt: 4500, peakFt: 7500 },
    'Mazama, WA (North Cascade Heli)': { baseFt: 5000, peakFt: 8600 },
    'Sun Valley, ID (Sun Valley Heli Ski)': { baseFt: 6500, peakFt: 10500 },
    'Driggs/Victor, ID (High Mountain Heli)': { baseFt: 6000, peakFt: 10000 },
    'Jackson, WY (High Mountain Heli - Snake River)': { baseFt: 6000, peakFt: 10000 },
    'Snowbird, UT (Powderbird)': { baseFt: 7500, peakFt: 11000 },
    'Lamoille, NV (Ruby Mountain Heli)': { baseFt: 7500, peakFt: 11000 },
    'Telluride, CO (Helitrax)': { baseFt: 10600, peakFt: 13700 },
    'Silverton, CO (Silverton Mountain)': { baseFt: 10400, peakFt: 13487 },
    'Bridgeport, CA (Sweetwater Heli)': { baseFt: 8500, peakFt: 11673 },
};

export function getTerrainElevation(name: string): TerrainElevation | undefined {
    return TERRAIN_ELEVATION[name];
}

// Condensed cancellation / refund policy per operator (a few words each).
// Best-effort from operators' published terms via research; verify exact terms
// with the operator before booking. 'Not published' where none was found.
export const CANCELLATION: Record<string, string> = {
    'Cordova, AK (Points North Heli-Adventures)': 'No cash refunds; tiered credit only',
    'Judd Lake, AK (Tordrillo Mountain Lodge)': 'Deposit forfeited if under 120 days',
    'Girdwood, AK (Chugach Powder Guides)': 'All deposits & payments non-refundable',
    'Valdez, AK (Valdez Heli-Ski Guides)': 'Refundable before Dec 1 (-$250 fee)',
    'Valdez, AK (Black Ops Valdez)': '50% deposit non-refundable; credit only',
    'Valdez, AK (Alaska Backcountry Guides)': '25% deposit non-refundable; no refunds',
    'Glacier View, AK (Majestic Heli Ski)': 'Not published — contact operator',
    'Haines, AK (SEABA)': 'Non-refundable unless cancel 90+ days out',
    'Haines, AK (Alaska Heliskiing)': 'Deposit 75% refundable, 90-day notice',
    'Seward, AK (Silverton Mountain Guides)': 'Not published — contact operator',
    'Alyeska Resort, AK (Resort Base)': 'Full refund 48+ hours before arrival',
    'Panorama, BC (RK Heliski)': 'Non-refundable; refund only if operator cancels',
    'Bella Coola, BC (Bella Coola Heli Sports)': 'Deposits non-refundable; insurance recommended',
    'Revelstoke, BC (Eagle Pass Heli Skiing)': 'Non-refundable deposit; none within 90 days',
    'Revelstoke, BC (Selkirk Tangiers)': '35% deposit non-refundable',
    'Revelstoke, BC (Eleven Experience)': 'Non-refundable; credit-only, CFAR insurance advised',
    'Gold Bridge, BC (Tyax Lodge & Heliskiing)': '25% deposit non-refundable',
    'Golden, BC (Great Canadian Heliskiing)': 'Non-refundable deposit after 48 hours',
    'Blue River, BC (Mike Wiegele Heli Skiing)': 'No refund unless replacement found',
    'Stewart, BC (Last Frontier Heliskiing)': '20% deposit non-refundable',
    'Terrace, BC (Northern Escape Heli Skiing)': '20% deposit non-refundable',
    'Whistler, BC (Whistler Heli-Skiing)': 'Not published — contact operator',
    'Nelson, BC (Snowwater Heli Skiing)': 'No refunds; 25% deposit, credit only',
    'Bugaboos, BC (CMH Heli-Skiing)': '20% deposit non-refundable',
    'Zermatt, Switzerland (Air Zermatt)': 'Fee non-refundable; refunded if weather cancels',
    'Aosta Valley, Italy (Valgrisenche Heli-Ski)': '25% deposit; guide services non-refundable',
    'Riksgränsen, Sweden (Arctic Elements)': 'Registration fee non-refundable; heli refunded',
    'Dalvik, Iceland (Arctic Heli Skiing)': '30% non-refundable deposit; insurance required',
    'Siglufjörður, Iceland (Summit Heliskiing)': '20% deposit; 80% refund if 7+ days',
    'Siglufjörður, Iceland (Viking Heli Skiing)': '25% non-refundable deposit; no weather refund',
    'Kulusuk, Greenland (Greenland Heliskiing)': 'Non-refundable deposit; no refund unused days',
    'Maniitsoq, Greenland (Heliskigreenland)': '30% deposit; no refund for weather days',
    'Niseko, Japan (Hokkaido Backcountry Club)': '25% deposit non-refundable (60+ days)',
    'Manali, India (Himalaya Heli Ski)': '30% deposit non-refundable',
    'Annapurna Range, Nepal (Himalayan Heliski)': '30% deposit non-refundable',
    'Svaneti, Georgia (Svaneti Heliskiing)': '20% deposit; balance due 90 days',
    'Santiago/Andes, Chile (Powder South)': 'Non-refundable; 50% weather credit',
    'Valle Nevado, Chile (Valle Nevado Heli-Ski)': 'Full refund if unable to fly',
    'Patagonia, Chile (Rio Palena Lodge)': 'Non-refundable deposit; rebook credit only',
    'Puma Lodge, Chile (Powder South)': 'Non-refundable; 50% weather credit',
    'Portillo, Chile (Ski Portillo Heli)': '50% deposit; tiered refund by date',
    'Queenstown, NZ (Harris Mountains Heli-Ski)': 'Full refund w/ notice; weather refunded',
    'Mazama, WA (North Cascade Heli)': '50% refundable 60+ days; none inside',
    'Sun Valley, ID (Sun Valley Heli Ski)': 'Non-refundable deposit; full credit given',
    'Driggs/Victor, ID (High Mountain Heli)': 'Non-refundable; credit lapses season end',
    'Jackson, WY (High Mountain Heli - Snake River)': 'Non-refundable; credit lapses season end',
    'Snowbird, UT (Powderbird)': 'Non-refundable deposit; weather = credit',
    'Lamoille, NV (Ruby Mountain Heli)': 'Non-refundable deposit; balance if seat refilled',
    'Telluride, CO (Helitrax)': 'Deposit non-refundable; weather fully refundable',
    'Silverton, CO (Silverton Mountain)': 'No refund inside 30 days',
    'Bridgeport, CA (Sweetwater Heli)': 'Not published — contact operator',
};

export function getCancellationPolicy(name: string): string | undefined {
    return CANCELLATION[name];
}

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
