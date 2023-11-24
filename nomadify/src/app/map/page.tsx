"use client";

import React, {useState, useEffect} from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Map = () => {
    // state for the state onMouseOver
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");
    const [data, setData] = useState(null);

    // TODO : Must figure out how to use the API fetching by the hover state and capital
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await fetch('https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Bratislava&country_name=Slovakia', {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
    //             'X-RapidAPI-Key': 'd6850ca347mshb135b00f6e9f6b2p109ccejsnf924080e2e9b',
    //         },
    //         });

    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }

    //         const result = await response.json();
    //         setData(result);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //     };

    //     fetchData();
    // }, [data]); 
    // console.log(data)

    return (
        <>  
            {/* <h2 className="text-3xl p-10 pt-40">Explore every <span className="custom_font custom_color">part</span> of the world</h2> */}
            {/* TODO: update the height and width of the map, bugging with the scrolling */}
            <div className='relative'>
                <MapChart setTooltipCountry={setCountry} setTooltipCapital={setCapital}/> 
            </div>
            <ReactTooltip id="my-tooltip">{country} {capital}</ReactTooltip>
        </>
    )
}

export default Map;