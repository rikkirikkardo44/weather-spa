import React, { useState } from "react";

import { EnvironmentOutlined } from "@ant-design/icons";

import { AModal } from "shared/components/AModal/AModal";
import { AForm } from "shared/components/AForm/AForm";
import { YandexMap } from "shared/components/Map/Map";
import { capitalize } from "shared/utils/string.utils";

import { WeatherForecastPageHeaderProps } from "./WeatherForecastPageHeaderProps";

export const WeatherForecastPageHeader: React.FC<WeatherForecastPageHeaderProps> = React.memo((props) => {
  const { cityName, setCityName } = props;
  const [visibleCityNameModal, setVisibleCityNameModal] = useState(false);
  const [visibleMapModal, setVisibleMapModal] = useState(false);

  return (
    <>
      <div className="weather-forecast-page-header">
        <EnvironmentOutlined className="weather-forecast-page-header__icon" onClick={() => setVisibleMapModal(true)} />
        <span className="weather-forecast-page-header__city" onClick={() => setVisibleCityNameModal(true)}>
          {cityName && capitalize(cityName)}
        </span>
      </div>
      <AModal
        visible={visibleCityNameModal}
        onCancel={() => setVisibleCityNameModal(false)}
        title="Введите название города"
      >
        <AForm
          placeholder="Город"
          onSubmit={(value: string) => {
            setCityName(value);
            setVisibleCityNameModal(false);
          }}
        />
      </AModal>
      <AModal
        className="map-modal"
        visible={visibleMapModal}
        onCancel={() => setVisibleMapModal(false)}
        title="Выберите координаты на карте"
      >
        <YandexMap />
      </AModal>
    </>
  );
});
