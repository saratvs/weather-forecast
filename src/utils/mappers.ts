import type { GetCoordinateResponse } from "../types/api";
import type { Coordinate } from "../types/weather";

export function mapCoordinate(data: GetCoordinateResponse): Coordinate {
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    city: data.name,
    country: data.country,
  };
}
