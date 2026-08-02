import { fetchWeatherApi } from "openmeteo";
import type { Coordinate } from "./types/weather.js";

import { createNavbar } from "./components/navbar.js";
import { getCoordinates } from "./api/geocoding.js";

const app = document.querySelector("#app");

if (app) {
  const navbar = createNavbar();
  app.appendChild(navbar);
}

const searchInput = document.querySelector<HTMLInputElement>("#search");
let timer: number;
let coordinate: any;

searchInput?.addEventListener("input", () => {
  const value = searchInput.value;
  if (!value.trim()) return;

  clearTimeout(timer);
  timer = window.setTimeout(async () => {
    coordinate = await getCoordinates(value);

    console.log("coordinate is this : ", coordinate);
  }, 2000);
});

// api scope
// Let's
// check
// these
// codes
// later
// Let's
// check
// these
// codes
// later// Let's
// check
// these
// codes
// later// Let's
// check
// these
// codes
// later// Let's
// check
// these
// codes
// later// Let's
// check
// these
// codes
// later

const params: Coordinate = {
  latitude: 52.52,
  longitude: 13.41,
  hourly: "temperature_2m",
};

// const url = "https://api.open-meteo.com/v1/forecast";
const url = import.meta.env.VITE_WEATHER_API_URL;
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

// console.log(
//   `\nCoordinates: ${latitude}°N ${longitude}°E`,
//   `\nElevation: ${elevation}m asl`,
//   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
// );

const hourly = response.hourly()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
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
  },
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
// console.log("\nHourly data:\n", weatherData.hourly);
