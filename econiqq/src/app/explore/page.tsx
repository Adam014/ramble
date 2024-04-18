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

    // const handleClick = () => {
    //     router.push(`/map/${country}/${capital}`);
    // }

    return (
        <>  
            <div>
                <h2 className="text-4xl m-10">Explore <span className='custom_font custom_color'>Globally</span></h2>
            </div>
            <Search />

            <div className='flex ml-10 tags'>
                {tagData.map((tag, index) => (
                    <Tag key={index} icon={tag.icon} label={tag.label} />
                ))}
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
        </>
    )
}

export default Map;