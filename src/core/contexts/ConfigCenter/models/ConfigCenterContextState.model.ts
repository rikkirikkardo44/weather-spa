import { WeatherForecastResponseContract } from "shared/http/api";

export interface ConfigCenterContextStateModel {
  loading: boolean;
  timestamps: number;
  data?: WeatherForecastResponseContract;
  cityName?: string;
}
