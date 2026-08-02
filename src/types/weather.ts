export interface Coordinate {
  latitude: number;
  longitude: number;
  hourly: string;
}
export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

type lang = "En" | "Fs";

export interface City {
  name: string;
  count?: number;
  format?: number;
  language?: lang;
  apikey?: string;
  countryCode?: string;
}
