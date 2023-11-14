import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

const MapChart = () => {
  return (
    <ComposableMap projectionConfig={{ scale: 120 }}>
      <Graticule stroke="#F13E51" />
      <Geographies geography="./features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#E08C9C" stroke="#ffff"/>
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
