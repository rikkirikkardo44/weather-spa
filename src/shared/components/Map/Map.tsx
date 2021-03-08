import React from "react";

import { YMaps, Map } from "react-yandex-maps";

export const YandexMap: React.FC = React.memo((props) => {
  const mapData = {
    center: [55.751574, 37.573856],
    zoom: 5,
    controls: ["zoomControl", "fullscreenControl"],
  };
  return (
    <div className="task-editor-maps">
      <YMaps
      >
        <Map
          defaultState={mapData}
          height="100%"
          width="100%"
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          onClick={(e: any) => {
            console.log(e);
          }}
        />
      </YMaps>
    </div>
  );
});
