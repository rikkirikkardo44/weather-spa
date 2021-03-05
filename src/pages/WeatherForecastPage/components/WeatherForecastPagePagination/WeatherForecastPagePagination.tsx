import React from "react";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { useConfigCenter } from "core/contexts/ConfigCenter";

export const WeatherForecastPagePagination: React.FC = React.memo((props) => {
  const [configCenterState, configCenterAction] = useConfigCenter();
  return (
    <div className="weather-forecast-page-pagination">
      <div className="weather-forecast-page-pagination__container">
        <LeftOutlined
          className="weather-forecast-page-pagination__container-icon"
          onClick={configCenterAction.previousTimestamp}
        />
        <RightOutlined
          className="weather-forecast-page-pagination__container-icon"
          onClick={configCenterAction.nextTimestamp}
        />
      </div>
    </div>
  );
});
