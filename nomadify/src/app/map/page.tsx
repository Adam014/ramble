"use client";

import React, { useState } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Map = () => {
    // state for the state onMouseOver
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");
    console.log(country, capital);

    return (
        <>  
            <h2 className="text-3xl p-10 pt-40">Choose your <span className="custom_font custom_color">country</span></h2>
            <div className='relative'>
                <MapChart 
                    setTooltipCountry={setCountry}                    
                    setTooltipCapital={setCapital}
                 /> 
            </div>
            <ReactTooltip id="my-tooltip">{country} {capital}</ReactTooltip>
        </>
    )
}

export default Map;