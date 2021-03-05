import React, { useCallback, useEffect, useState } from "react";

import { Alert } from "antd";

import { WeatherForecastResponseContract, WeatherService } from "shared/http/api";
import { API_KEY, DEFAULT_TIMESTAMPS, MAX_TIMESTAMPS, TIMESTAMPS_STEP } from "shared/constants/api.constants";
import { showCustomModal } from "shared/utils/modal.utils";

import { ConfigCenterContext } from "./ConfigCenterContext";
import { ApiKeyRequestForm } from "./components/ApiKeyRequestForm";

export const ConfigCenterContextProvider: React.FC = React.memo(({ children }) => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(API_KEY);
  const [timestamps, setTimestamps] = useState(DEFAULT_TIMESTAMPS);
  const [cityName, setCityName] = useState<string>("chelyabinsk");
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecastResponseContract>();
  const [error, setError] = useState<string>();
  console.log(weatherForecast);
  console.log(cityName)
  const fetchWeatherForecast = useCallback(async () => {
    if (!apiKey) return;
    setLoading(true);
    try {
      const response = await WeatherService.getFiveDayForecast({ cityName, apiKey, body: { cnt: timestamps } });
      setWeatherForecast(response);
    } catch (e) {
      setError("Во время запроса прогноза погоды произошла ошибка");
    } finally {
      setLoading(false);
    }
  }, [apiKey, cityName, timestamps]);

  useEffect(() => {
    if (!apiKey) {
      showCustomModal({
        className: "modal-without-footer",
        cancelText: "Отмена",
        okText: "Сохранить",
        title: "Для полечния погоды нужен ApiKey",
        content: <ApiKeyRequestForm onSubmit={setApiKey} />,
      });
    } else {
      fetchWeatherForecast();
    }
  }, [fetchWeatherForecast, apiKey]);

  const previousTimestamp = useCallback(() => {
    if (timestamps === DEFAULT_TIMESTAMPS) {
      return;
    }
    setTimestamps(timestamps - TIMESTAMPS_STEP);
  }, [timestamps]);

  const nextTimestamp = useCallback(() => {
    if (timestamps === MAX_TIMESTAMPS) {
      return;
    }
    setTimestamps(timestamps + TIMESTAMPS_STEP);
  }, [timestamps]);

  return (
    <ConfigCenterContext.Provider
      value={[
        { loading, data: weatherForecast, cityName, timestamps },
        { nextTimestamp, previousTimestamp, setCityName },
      ]}
    >
      {error && <Alert message={error} type="error" />}
      {!error && children}
    </ConfigCenterContext.Provider>
  );
});
