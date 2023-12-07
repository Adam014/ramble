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
    // console.log(country, capital);

    const router = useRouter();

    const handleClick = () => {
        router.push(`/map/${country}/${capital}`);
    }

    return (
        <>  
            <h2 className="text-4xl m-10">Explore <span className='custom_font custom_color'>Globally</span></h2>
            <p className='ml-10 text-2xl w-1/2'>Say goodbye to daily routine and become a <span className='custom_font custom_color'>citizen</span> of the world! Learn, live and love every <span className='custom_font custom_color'>destination</span> with Nomadify’s cost of living comparison.</p>
            <Link href="/" className='absolute right-0 mt-24 sm:mt-0 md:mt-10 m-10 cursor-pointer duration-200 hover:scale-125 active:scale-100'><p><span className='custom_font'>arrow</span> Return</p></Link>
            <div className='relative flex justify-center -mt-40'>
                <MapChart 
                    setTooltipCountry={setCountry}                    
                    setTooltipCapital={setCapital}
                    handleClick={handleClick}
                 /> 
            </div>
            <ReactTooltip id="my-tooltip">{country}, {capital}</ReactTooltip>
            <div>
                <h4 className='sm:text-2xl sm:m-5 lg:text-3xl lg:m-10 text-2xl m-5'>If you can't find the <span className='custom_font custom_color'>city</span> you are looking for, dont worry! <br /><br />Try to write in URL for example <code>/country/your_city</code> or just simply <span className='custom_font custom_color underline'><Link href="/contact">Contact us here</Link></span>!</h4>
            </div>
        </>
    )
}

export default Map;