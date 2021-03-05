import React, { useCallback, useState } from "react";

import { EnvironmentOutlined } from "@ant-design/icons";

import { showCustomModal } from "shared/utils/modal.utils";
import { capitalize } from "shared/utils/string.utils";

import { WeatherForecastPageHeaderProps } from "./WeatherForecastPageHeaderProps";
import { Input } from "antd";

export const WeatherForecastPageHeader: React.FC<WeatherForecastPageHeaderProps> = React.memo((props) => {
  const { cityName, setCityName } = props;
  const [newCityName, setNewCityName] = useState("");
  console.log(newCityName);
  const modalHandler = useCallback(() => {
    showCustomModal({
      cancelText: "Отмена",
      okText: "Сохранить",
      title: "Введите название города",
      onOk: () => {
        if (newCityName?.length) {
          console.log("OK");
          setCityName(newCityName);
        }
        // setNewCityName("");
      },
      onCancel: () => {
        setNewCityName("");
      },
      content: (
        <Input
          placeholder="Город"
          defaultValue={newCityName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setNewCityName(value);
          }}
        />
      ),
    });
  }, [newCityName, setCityName]);

  return (
    <div className="weather-forecast-page-header">
      <EnvironmentOutlined className="weather-forecast-page-header__icon" />
      <span className="weather-forecast-page-header__city" onClick={modalHandler}>
        {cityName && capitalize(cityName)}
      </span>
    </div>
  );
});
