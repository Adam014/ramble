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
    <div>
      <ComposableMap projectionConfig={{ scale: 150 }} >
          <Graticule stroke="#F13E51" />
          <ZoomableGroup>
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    data-tooltip-id="my-tooltip"      
                    data-tooltip-offset={0}
                    data-tooltip-float={true}
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {       
                      setTooltipContent(
                      <div>
                        ID: {geo.id} <br />
                        Country: {geo.properties.name} <br />
                         Capital: {geo.properties?.capital}
                      </div>);
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
