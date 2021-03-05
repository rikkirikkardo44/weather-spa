import { WeatherForecastResponseContract } from "shared/http/api";

export interface WeatherForecastPageBodyProps {
  timestamp: number;
  data?: WeatherForecastResponseContract;
}
