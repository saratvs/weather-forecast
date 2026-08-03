import { getCoordinates } from "./api/geocoding.js";
import { getWeather } from "./api/weather.js";
import { weatherCard } from "./components/weatherCard.js";
import { loadingCard } from "./components/loadingCard.js";
import { messageCard } from "./components/messageCard.js";
import { mapCoordinate } from "./utils/mappers.js";
import type { Coordinate } from "./types/weather.js";

import "./styles/input.css";

const main = document.querySelector("#main") as HTMLElement | null;

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

      if (apiCoordinate == null) {
        main!.innerHTML = messageCard("City not found!");
      }
      coordinate = mapCoordinate(apiCoordinate!);

      weather = await getWeather(coordinate);

      main!.innerHTML = weatherCard(value, weather);
    } catch (error) {
      if (!error) return;
    }
  }, 500);
});
