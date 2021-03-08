import React, { useCallback, useEffect, useState } from "react";

import { Alert } from "antd";

import { AModal } from "shared/components/AModal/AModal";
import { AForm } from "shared/components/AForm/AForm";
import {
  DEFAULT_CITY_NAME,
  DEFAULT_TIMESTAMPS,
  MAX_TIMESTAMPS,
  TIMESTAMPS_STEP,
} from "shared/constants/api.constants";
import { WeatherForecastResponseContract, WeatherService } from "shared/http/api";

import { ConfigCenterContext } from "./ConfigCenterContext";

export const ConfigCenterContextProvider: React.FC = React.memo(({ children }) => {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>();
  const [timestamps, setTimestamps] = useState(DEFAULT_TIMESTAMPS);
  const [cityName, setCityName] = useState<string>(DEFAULT_CITY_NAME);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecastResponseContract>();
  const [error, setError] = useState<string>();
  const [visibleApiKeyModal, setVisibleApiKeyModal] = useState(false);

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
      setVisibleApiKeyModal(true);
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
      <AModal
        visible={visibleApiKeyModal}
        onCancel={() => setVisibleApiKeyModal(false)}
        title="Для полечния погоды нужен ApiKey"
      >
        <AForm
          placeholder="Введите ApiKey"
          onSubmit={(value: string) => {
            setApiKey(value);
            setVisibleApiKeyModal(false);
          }}
        />
      </AModal>
    </ConfigCenterContext.Provider>
  );
});
