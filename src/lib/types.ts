export interface WeatherData {
    current: {
        temp: number;
        windSpeed: number;
        windGust: number;
        condition: string;
        visibility: number; // meters
    };
    forecast: DailyForecast[];
    heliAttributes: {
        baseWind: number; // at 2000ft approx
        visibilityCheck: boolean;
        flightViable: boolean;
        reason: string | null;
    };
}

export interface DailyForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    snowfall: number; // cm
    precipProb: number;
}

export type HeliStatus = 'GO' | 'STANDBY' | 'NO-FLY';
