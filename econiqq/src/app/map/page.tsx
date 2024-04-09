"use client";

import React, { useState } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { NoCity } from '@components/NoCity';
import QuestionMark from "../../../public/assets/icons/question-mark.png"
import Image from 'next/image';

import tagData from '../../../public/tags.json';

import Search from '@components/Search';
import Tag from '@components/Tag';

const Map = () => {
    // state for the state onMouseOver
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");

    const router = useRouter();

    const handleClick = () => {
        router.push(`/map/${country}/${capital}`);
    }

    return (
        <>  
            <div>
                <h2 className="text-4xl m-10">Explore <span className='custom_font custom_color'>Globally</span></h2>
            </div>
            <Search />

            {/* <div className='cursor-pointer' data-tooltip-id="nocity-tooltip" >
                <ReactTooltip id='nocity-tooltip' openOnClick={true} clickable className='custom-tooltip'><NoCity /></ReactTooltip>
                <Image src={QuestionMark} alt='question-mark' height={20} width={20} className='ml-10'/>
            </div> */}

            <div className='flex ml-10 tags'>
                {tagData.map((tag, index) => (
                    <Tag key={index} icon={tag.icon} label={tag.label} />
                ))}
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
            <div className='relative flex justify-center -mt-46 map-container'>
                <MapChart 
                    setTooltipCountry={setCountry}                    
                    setTooltipCapital={setCapital}
                    handleClick={handleClick}
                 /> 
            </div>
            <ReactTooltip id="my-tooltip">{country}, {capital}</ReactTooltip>
        </>
    )
}

export default Map;