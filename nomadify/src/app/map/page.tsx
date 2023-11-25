"use client";

import React, {useState } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Map = () => {
    // state for the state onMouseOver
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");

    return (
        <>  
            {/* <h2 className="text-3xl p-10 pt-40">Explore every <span className="custom_font custom_color">part</span> of the world</h2> */}
            {/* TODO: update the height and width of the map, bugging with the scrolling */}
            <div className='relative'>
                <MapChart setTooltipCountry={setCountry} setTooltipCapital={setCapital} /> 
            </div>
            <ReactTooltip id="my-tooltip">{country} {capital}</ReactTooltip>
        </>
    )
}

export default Map;