"use client";

import React, { useState, useEffect } from 'react';
import { fetchCities, fetchCitiesData } from '@utils/utils';

import tagData from '../../../public/tags.json';

import Search from '@components/Search';
import Tag from '@components/Tag';
import CityCard from '@components/CityCard';
import Loader from "@components/Loader";

const Map = () => {
    const [featuredCities, setFeaturedCities] = useState([]);
    const [otherCities, setOtherCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCities = async () => {
            setIsLoading(true); // Start loading
            const sortedCities = await fetchCities();
            setFeaturedCities(sortedCities.slice(0, 5));
            setOtherCities(sortedCities.slice(5));
            setIsLoading(true); // Stop loading once data is fetched
        };

        getCities();
    }, []); 

    return (
        <div className='ml-10 mr-5'>  
            <div>
                <h2 className="text-4xl mt-10 mb-10">Explore <span className='custom_font custom_color'>Globally</span></h2>
            </div>

            <Search />

            <div className='flex tags'>
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

            <div className='featured-items '>
                <h1 className='text-5xl mt-10'>Featured places</h1>
                <div className='flex featured-cities-container'>
                    { isLoading ? 
                        <Loader />
                    : 
                        featuredCities.map((city, index) => (
                            <CityCard city={city} key={index} />
                        ))
                    }
                </div>

            </div>
            <div className='other-items mt-32 mb-32'>
                <h1 className='text-5xl'>Where about?</h1>
                <div className='other-cities-container grid grid-cols-5 '>  
                    { isLoading ? 
                        <Loader />
                    : 
                        otherCities.map((city, index) => (
                            <CityCard city={city} key={index} />
                        ))
                    }      
                </div>
            </div>
        </div>
    )
}

export default Map;