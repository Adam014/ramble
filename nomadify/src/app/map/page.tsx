"use client";

import React, { useState } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { NoCity } from '@components/NoCity';

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
            <p className='ml-10 text-2xl sm:w-9/12 md:w-1/2'>Say goodbye to daily routine and become a <span className='custom_font custom_color'>citizen</span> of the world! Learn, live and love every <span className='custom_font custom_color'>destination</span> with Nomadify’s cost of living comparison.</p>
            {/* TODO: Add here badges, like no charge etc.. */}
            <div className='absolute top-0 right-0 mr-50 m-10 back-button'>
                <Image src="/assets/images/circle1.png" height={100} width={250} alt="circle" className='absolute -top-2' />
                <Link href="/" className='text-xl'><h5 className='relative z-50'><span className='custom_font'>arrow</span> Return</h5></Link>
            </div>
            <div className='links-container text-3xl fixed right-0 p-10 top-1/3 z-50'>
                <Link href="https://www.instagram.com/kindastxd/">
                    <h3 className='pb-2'>Instagram</h3>
                </Link>
                <hr />
                <Link href="https://twitter.com/kindastcs">
                    <h3 className='pb-2 pt-2'>Twitter</h3>
                </Link>
                <hr />
                <Link href="https://github.com/Adam014">
                    <h3>Github</h3>
                </Link>
            </div>
            <div id="mouse-scroll" className='mouse_scroll hidden'>
                <div className="mouse">
                    <div className="mouse-in"></div>
                </div>
                <div>
                    <span className="down-arrow-1"></span>
                    <span className="down-arrow-2"></span>
                    <span className="down-arrow-3"></span>
                </div>
            </div>
            <div className='relative flex justify-center -mt-40 map-container'>
                <MapChart 
                    setTooltipCountry={setCountry}                    
                    setTooltipCapital={setCapital}
                    handleClick={handleClick}
                 /> 
            </div>
            <ReactTooltip id="my-tooltip">{country}, {capital}</ReactTooltip>
            <NoCity />
        </>
    )
}

export default Map;