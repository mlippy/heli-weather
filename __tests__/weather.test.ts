import { getAlyeskaWeather } from '../src/services/weather';
import '@testing-library/jest-dom';

// Mock the global fetch
global.fetch = jest.fn();

describe('Heli-Ski Logic V1', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be GO if conditions are perfect', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                current: {
                    temperature_2m: 25,
                    wind_speed_10m: 10,
                    wind_gusts_10m: 15,
                    weather_code: 0,
                },
                hourly: {
                    visibility: [10000], // 10km (clear)
                    wind_speed_80m: [15] // 15mph aloft
                },
                daily: {
                    time: ['2026-02-05'],
                    temperature_2m_max: [30],
                    temperature_2m_min: [20],
                    snowfall_sum: [5],
                    precipitation_probability_max: [50]
                }
            }),
        });

        const data = await getAlyeskaWeather();
        expect(data.heliAttributes.flightViable).toBe(true);
        expect(data.heliAttributes.reason).toBe(null);
    });

    it('should be NO-FLY if visibility is low (< 2 miles / 3200m)', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                current: { temperature_2m: 25, wind_speed_10m: 10, wind_gusts_10m: 15, weather_code: 0 },
                hourly: {
                    visibility: [1000], // 1km (Fog)
                    wind_speed_80m: [10]
                },
                daily: { time: [], temperature_2m_max: [], temperature_2m_min: [], snowfall_sum: [], precipitation_probability_max: [] }
            }),
        });

        const data = await getAlyeskaWeather();
        expect(data.heliAttributes.flightViable).toBe(false);
        expect(data.heliAttributes.reason).toBe("Poor Visibility");
    });

    it('should be NO-FLY if ridge wind is high (> 30mph)', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                current: { temperature_2m: 25, wind_speed_10m: 10, wind_gusts_10m: 15, weather_code: 0 },
                hourly: {
                    visibility: [10000],
                    wind_speed_80m: [45] // 45mph aloft
                },
                daily: { time: [], temperature_2m_max: [], temperature_2m_min: [], snowfall_sum: [], precipitation_probability_max: [] }
            }),
        });

        const data = await getAlyeskaWeather();
        expect(data.heliAttributes.flightViable).toBe(false);
        expect(data.heliAttributes.reason).toBe("High Winds Aloft");
    });
});
