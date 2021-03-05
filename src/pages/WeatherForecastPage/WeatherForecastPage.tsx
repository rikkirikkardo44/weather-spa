import React from "react";

import { useConfigCenter } from "core/contexts/ConfigCenter";
import { Loader } from "shared/components/Loader";

import { WeatherForecastPageHeader } from "./components/WeatherForecastPageHeader";
import { WeatherForecastPageBody } from "./components/WeatherForecastPageBody";
import { WeatherForecastPagePagination } from "./components/WeatherForecastPagePagination";

export const WeatherForecastPage: React.FC = React.memo((props) => {
  const [configCenterState, configCenterAction] = useConfigCenter();
  return (
    <div className="weather-forecast-page">
      <div className="wrapper">
        <div className="content">
          <WeatherForecastPageHeader cityName={configCenterState.cityName} setCityName={configCenterAction.setCityName} />
          <Loader isLoading={configCenterState.loading}>
            <WeatherForecastPageBody data={configCenterState.data} timestamp={configCenterState.timestamps} />
          </Loader>
          <WeatherForecastPagePagination />
        </div>
      </div>
    </div>
  );
});
