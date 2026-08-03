export interface Coordinate {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}
type Rainy = {
  rain: boolean;
};
export interface WeatherCardItem {
  icon: string;
  parameter: string | number | Rainy | Date;
}

export interface WeatherCardProps {
  current: {
    temperature: number;
    rain: number;
    weatherCode: number;
  };

  daily: {
    sunrise: Date;
    sunset: Date;
  };
}
