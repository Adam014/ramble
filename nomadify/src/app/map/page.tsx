"use client";

import React, { useState } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const Map = () => {
    // state for the state onMouseOver
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");
    console.log(country, capital);

    const router = useRouter();

    const handleClick = () => {
        router.push(`/map/${country}/${capital}`);
    }

    return (
        <>  
            <h2 className="text-4xl m-10 mt-52 absolute">Choose your <span className="custom_font custom_color">country</span></h2>
            <Link href="/" className='absolute right-0 mt-24 sm:mt-0 md:mt-10 m-10 cursor-pointer duration-200 hover:scale-125 active:scale-100'><p><span className='custom_font'>arrow</span> Return</p></Link>
            <div className='relative flex justify-center'>
                <MapChart 
                    setTooltipCountry={setCountry}                    
                    setTooltipCapital={setCapital}
                    handleClick={handleClick}
                 /> 
            </div>
            <ReactTooltip id="my-tooltip">{country} {capital}</ReactTooltip>
        </>
    )
}

export default Map;