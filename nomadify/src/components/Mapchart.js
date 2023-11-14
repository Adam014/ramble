import React, { memo } from "react";
import {
  Graticule,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {
  return (
    <div data-tip="">
      <ComposableMap>
          <Graticule stroke="#F13E51" />
          <Geographies geography="././features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#E08C9C",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E08C9C",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
