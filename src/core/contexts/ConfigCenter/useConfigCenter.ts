import React from "react";

import { ConfigCenterContext } from "./ConfigCenterContext";

export const useConfigCenter = () => {
  return React.useContext(ConfigCenterContext);
};
