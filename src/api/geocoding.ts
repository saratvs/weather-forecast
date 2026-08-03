import type { GetCoordinateResponse } from "../types/api";
import type { Coordinate } from "../types/weather";

// get latitude and longitude from the city's name
export async function getCoordinates(
  city: string,
): Promise<GetCoordinateResponse | null> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json&utm_source=chatgpt.com`,
  );
  if (!response.ok) {
    throw new Error("Network Error");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  return data.results[0];
}
