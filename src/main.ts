import { createNavbar } from "./components/navbar.js";
import { getCoordinates } from "./api/geocoding.js";
import { getWeather } from "./api/weather.js";

const app = document.querySelector("#app");

if (app) {
  const navbar = createNavbar();
  app.appendChild(navbar);
}

const searchInput = document.querySelector<HTMLInputElement>("#search");
let timer: number;
let coordinate: any;
let weather: any;

searchInput?.addEventListener("input", () => {
  const value = searchInput.value;
  if (!value.trim()) return;

  clearTimeout(timer);
  timer = window.setTimeout(async () => {
    coordinate = await getCoordinates(value);

    getWeather();

    // console.log(
    //   `coordinate.latitude & coordinate longitude : ${coordinate.latitude} & ${coordinate.longitude}`,
    // );
  }, 2000);
});
