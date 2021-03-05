import React, { useMemo } from "react";

import Icon from '@ant-design/icons';

import moment from "moment";

import { ReactComponent as CloudMoon } from "../../../../assets/weather/cloud-moon.svg";

import { WeatherForecastPageBodyProps } from "./WeatherForecastPageBodyProps";

export const WeatherForecastPageBody: React.FC<WeatherForecastPageBodyProps> = React.memo((props) => {
  const { data, timestamp } = props;
  const index = useMemo(() => {
    return timestamp - 1;
  }, [timestamp]);
  console.log(index);
  const list = data?.list?.[index];
  const weather = list?.weather[0];
  const main = data?.list?.[index]?.main;
  const date = moment(list?.dt_txt).format("DD.MM.YYYY");
  const time = moment(list?.dt_txt).format("HH:mm");
  return (
    <div className="weather-forecast-page-body">
      {data && (
        <>
          <div className="weather-forecast-page-body__weather">
            <div className="weather-icon">
              <Icon component={() => <CloudMoon className="icon" />}/>
            </div>
            <div className="weather-name">{weather?.main}</div>
          </div>
          <div className="weather-forecast-page-body__main">
            <div className="date-time">
              <div className="date">{date}</div>
              <div className="time">{time}</div>
            </div>
            <div className="weather-characteristics">
              <div className="weather-characteristics__temperature">
                <div className="weather-characteristics__temperature__current">{main?.temp && Math.round(main.temp)}°</div>
              </div>
              <div className="weather-characteristics__other">
                <div className="weather-characteristics__other__feels-like">Feels like: {main?.feels_like}°</div>
                <div className="weather-characteristics__other__max">Max {main?.temp_max}°</div>
                <div className="weather-characteristics__other__min">Min {main?.temp_min}°</div>
                <div className="weather-characteristics__other__humidity">Humidity: {main?.humidity}%</div>
                <div className="weather-characteristics__other__wind">Wind: {list?.wind?.speed}km/h</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
