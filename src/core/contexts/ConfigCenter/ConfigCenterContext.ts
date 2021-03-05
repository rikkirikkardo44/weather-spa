import React from "react";

import { DEFAULT_TIMESTAMPS } from "shared/constants";

import { ConfigCenterContextActionModel, ConfigCenterContextStateModel } from "./models";

export const ConfigCenterContext = React.createContext<[ConfigCenterContextStateModel, ConfigCenterContextActionModel]>(
  [
    {
      loading: false,
      timestamps: DEFAULT_TIMESTAMPS,
    },
    {
      nextTimestamp: () => {},
      previousTimestamp: () => {},
      setCityName: () => {},
    },
  ]
);
