import React, { memo } from "react";
import {
  Graticule,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {

  return (
    <div data-tip="">
      <ComposableMap projectionConfig={{ scale: 120 }}>
          <Graticule stroke="#F13E51" />
          <ZoomableGroup>
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
                        fill: "#F13E51",
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
