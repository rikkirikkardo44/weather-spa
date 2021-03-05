import React from "react";

import { WeatherForecastPage } from "pages/WeatherForecastPage";

import { ConfigCenterContextProvider } from "../contexts/ConfigCenter";

import "shared/styles/app.scss";

function App() {
  return (
    <ConfigCenterContextProvider>
      <div className="app">
        <WeatherForecastPage />
      </div>
    </ConfigCenterContextProvider>
  );
}

export default App;
