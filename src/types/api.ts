export interface GetCoordinateRequest {
  name: string;
  count?: number;
  format?: string;
  language?: string;
  apikey?: string;
  countryCode?: string;
}

export interface GetCoordinateResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: [];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}

interface hourly {}
export interface GetWeatherRequest {
  latitude: number;
  longitude: number;
  elevation?: number;
  hourly?: {};
  temperature_unit?: string;
  wind_speed_unit?: string;
  precipitation_unit?: string;
  timeformat?: number;
  past_days?: number;
  start_date?: string;
  end_date?: string;
  cell_selection?: string;
  apikey?: string;
}

export interface GetWeatherResponse {}
