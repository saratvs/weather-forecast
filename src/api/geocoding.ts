import type { GetCoordinateResponse } from "../types/api";

// get latitude and longitude from the city's name
export async function getCoordinates(city: string) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json&utm_source=chatgpt.com`,
  );
  const data = await response.json();

  const location: GetCoordinateResponse = data.results[0]!;

  if (!location) {
    throw new Error("City not found");
  }
  // console.log("location result : ", location);

  return {
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name,
  };
}
