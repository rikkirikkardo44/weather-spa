import React from "react";

import { Spin } from "antd";

import { LoaderProps } from "./LoaderProps.model";

export const Loader: React.FC<LoaderProps> = ({ isLoading, children }) => {
  return (
    <Spin
      spinning={isLoading}
      style={{ height: "100%", backgroundColor: "transparent" }}
      size="large"
    >
      {children}
    </Spin>
  );
};
