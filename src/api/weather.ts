// get information about weather
import { fetchWeatherApi } from "openmeteo";
import type { Coordinate } from "../types/weather";

export async function getWeather(coordinate: Coordinate) {
  const params = {
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
    current: ["temperature_2m", "rain", "weather_code"],
    hourly: ["temperature_2m", "weather_code", "rain"],
    daily: ["sunrise", "sunset"],
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  const sunrise = daily.variables(0)!;
  const sunset = daily.variables(1)!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      rain: current.variables(1)!.value(),
      weather_code: current.variables(2)!.value(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
      rain: hourly.variables(2)!.valuesArray(),
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      // Map Int64 values to according structure
      sunrise: [...Array(sunrise.valuesInt64Length())].map(
        (_, i) =>
          new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000),
      ),
      // Map Int64 values to according structure
      sunset: [...Array(sunset.valuesInt64Length())].map(
        (_, i) =>
          new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000),
      ),
    },
  };
  return {
    current: {
      temperature: current.variables(0)!.value(),
      rain: current.variables(1)!.value(),
      weatherCode: current.variables(2)!.value(),
    },

    daily: {
      sunrise: new Date(
        (Number(sunrise.valuesInt64(0)) + utcOffsetSeconds) * 1000,
      ),

      sunset: new Date(
        (Number(sunset.valuesInt64(0)) + utcOffsetSeconds) * 1000,
      ),
    },
  };
}
