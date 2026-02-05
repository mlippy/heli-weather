export interface WeatherData {
    current: {
        temp: number;
        windSpeed: number;
        windGust: number;
        condition: string;
        visibility: number;
    };
    forecast: DailyForecast[];
    heliAttributes: HeliAttributes;
    hourly: HourlyForecast[];
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
}
