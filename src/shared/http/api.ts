import axios from "axios";

import { API_URLS } from "shared/constants/api.constants";

axios.defaults.baseURL = API_URLS.BASE_URL;
axios.defaults.headers.get["Accept"] = "application/json";

export class WeatherService {
  static getFiveDayForecast(
    params: {
      cityName: string;
      apiKey: string;
      body?: WeatherForecastOptionsRequestContract;
    } = {} as any
  ): Promise<WeatherForecastResponseContract> {
    const { cityName, apiKey, body = {} } = params;
    const { cnt, units } = body;
    return new Promise((resolve, reject) => {
      const url = `/forecast?q=${cityName}&${cnt ? `cnt=${cnt}&` : ""}${units ? `units=${units}&` : "units=metric&"}lang=${LanguageEnum.Russian}&appid=${apiKey}`;
      return axios
        .request({ url, method: "get" })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export interface WeatherForecastOptionsRequestContract {
  mode?: ResponseFormatEnum;
  cnt?: number;
  units?: UnitsMeasurementEnum;
  lang?: LanguageEnum;
}

export interface WeatherForecastResponseContract {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastModel[];
  city: CityModel;
}

export interface CityModel {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherForecastModel {
  dt: Date;
  main: MainDataModel;
  weather: WeatherModel[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface MainDataModel {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherModel {
  id: number;
  main: string;
  description: string;
  icon: number;
}

export enum ResponseFormatEnum {
  xml = "xml",
  json = "json",
}

export enum UnitsMeasurementEnum {
  standard = "standard",
  metric = "metric",
  imperial = "imperial",
}

export enum LanguageEnum {
  Afrikaans = "af",
  Albanian = "al",
  Arabic = "ar",
  Azerbaijani = "az",
  Bulgarian = "bg",
  Catalan = "ca",
  Czech = "cz",
  Danish = "da",
  German = "de",
  Greek = "el",
  English = "en",
  French = "fr",
  Italian = "it",
  Romanian = "ro",
  Russian = "ru",
  Spanish = "sp",
  Ukrainian = "ua",
}
