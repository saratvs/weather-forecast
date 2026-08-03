import { createNavbar } from "./components/navbar.js";
import { getCoordinates } from "./api/geocoding.js";
import { getWeather } from "./api/weather.js";
import { weatherCard } from "./components/weatherCard.js";
import { loadingCard } from "./components/loadingCard.js";

import "./styles/input.css";
import { errorCard } from "./components/errorCard.js";
import type { GetCoordinateResponse } from "./types/api.js";
import { mapCoordinate } from "./utils/mappers.js";
import type { Coordinate } from "./types/weather.js";

const app = document.querySelector("#app");
const main = document.querySelector("#main") as HTMLElement | null;

//when show navbar
if (app) {
  const navbar = createNavbar();
  app.appendChild(navbar);
}
// when a city name is searched
const searchInput = document.querySelector<HTMLInputElement>("#search");
let timer: number;
let coordinate: Coordinate;
let weather: any;

searchInput?.addEventListener("input", () => {
  const value = searchInput.value;
  if (!value.trim()) return;

  clearTimeout(timer);
  timer = window.setTimeout(async () => {
    try {
      main!.innerHTML = loadingCard();
      const apiCoordinate = await getCoordinates(value);
      coordinate = mapCoordinate(apiCoordinate!);
      weather = await getWeather(coordinate);

      main!.innerHTML = weatherCard(value, weather);
    } catch (error) {
      if (!error) return;
    }
  }, 500);
});
