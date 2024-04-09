"use client";

import React, { useState } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import { NoCity } from '@components/NoCity';
import QuestionMark from "../../../public/assets/icons/question-mark.png"
import Image from 'next/image';

const page = () => {
    // state for the state onMouseOver
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");

    const router = useRouter();

    const handleClick = () => {
        router.push(`/explore/${country}/${capital}`);
    }

  return (
    <div className='relative'>
        <h1 className='flex justify-center xl:text-5xl md:text-2xl sm:text-xl mt-10'>So, where to?</h1>
        <div className='cursor-pointer flex absolute bottom-1/4 left-10 z-50 map-tooltip-container' data-tooltip-id="nocity-tooltip" >
            <ReactTooltip id='nocity-tooltip' openOnClick={true} clickable className='custom-tooltip'><NoCity /></ReactTooltip>
            <div className='flex'>
                <h1>Need help</h1>
                <Image src={QuestionMark} alt='question-mark' height={20} width={20} className='ml-2'/>
            </div>
        </div>
        <div className='relative flex justify-center map-container'>
            <MapChart 
                setTooltipCountry={setCountry}                    
                setTooltipCapital={setCapital}
                handleClick={handleClick}
                /> 
        </div>
        <ReactTooltip id="my-tooltip">{country}, {capital}</ReactTooltip>
    </div>
  )
}

export default page
