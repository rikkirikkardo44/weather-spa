import React from "react";

import { useConfigCenter } from "core/contexts/ConfigCenter";
import { Loader } from "shared/components/Loader";

import { WeatherForecastPageHeader } from "./components/WeatherForecastPageHeader";
import { WeatherForecastPageBody } from "./components/WeatherForecastPageBody";
import { WeatherForecastPagePagination } from "./components/WeatherForecastPagePagination";

export const WeatherForecastPage: React.FC = React.memo((props) => {
  const [configCenterState, configCenterAction] = useConfigCenter();
  return (
    <Loader isLoading={configCenterState.loading}>
      <div className="weather-forecast-page">
        <div className="wrapper">
          <div className="content">
            <WeatherForecastPageHeader
              cityName={configCenterState.data?.city.name}
              setCityName={configCenterAction.setCityName}
            />
            <WeatherForecastPageBody data={configCenterState.data} timestamp={configCenterState.timestamps} />
            <WeatherForecastPagePagination />
          </div>
        </div>
      </div>
    </Loader>
  );
});
