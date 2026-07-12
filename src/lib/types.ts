export interface WeatherData {
    current: {
        temp: number;
        windSpeed: number;
        windGust: number;
        condition: string;
        visibility: number;
        lightCondition: string;
        cloudCeiling: string;
    };
    forecast: DailyForecast[];
    heliAttributes: HeliAttributes;
    hourly: HourlyForecast[];
    elevation: number;
    regional: RegionalWeather[];
}

export interface RegionalWeather {
    direction: string; // "North" | "South" | "East" | "West"
    temp: number;
    windSpeed: number;
    condition: string;
    weatherCode: number;
    elevation: number;
    visibility: number;
}

export interface HourlyForecast {
    time: string;
    temp: number;
    precipProb: number;
    condition: string;
    weatherCode: number;
}

export interface DailyForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    snowfall: number;
    precipProb: number;
}

export interface HeliAttributes {
    baseWind: number;
    visibilityCheck: boolean;
    flightViable: boolean;
    reason: string | null;
}

export interface Location {
    name: string;
    lat: number;
    lon: number;
    website: string;
    description: string;
    pricing: string;
}

export interface TravelEstimate {
    origin: string;       // departure airport: "BWI" or "IAD"
    destAirport: string;  // practical arrival airport (IATA)
    flightHours: number;  // approx air travel incl. typical connections
    driveHours: number;   // approx drive from arrival airport to operator base
}

export interface NearbyResort {
    resort: string;      // name of the lift-served ski resort
    driveHours: number;  // approx drive time from the operator base
    note?: string;       // optional caveat (e.g. not road-connected)
}

export interface TerrainElevation {
    baseFt: number;  // approx lowest skiable / valley pickup elevation (ft)
    peakFt: number;  // approx highest skiable summit / drop-off elevation (ft)
}
export interface Region {
    label: string;
    filter: string;
    borderColor: string;
    badge: string;
    textColor: string;
}
