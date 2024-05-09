"use client";

import React, { useEffect } from 'react';
import { useCities } from '@hooks/useCities'; 

import tagData from '../../../public/tags.json';

import Search from '@components/Search';
import Tag from '@components/Tag';
import CityCard from '@components/CityCard';
import Loader from "@components/Loader";
import { fetchCitiesData } from '@utils/utils';

const Map = () => {
    const { featuredCities, otherCities, isLoading } = useCities(); // Use custom hook to manage city data

    // TODO:
    // Add pagination so every page will call this function with its number
    // useEffect(() => {
    //     fetchCitiesData(1);
    // }, [])

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

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {/* Add skeleton loading also, because it is glitching sometimes in loading */}
                    <div className='featured-items'>
                        <h1 className='text-5xl mt-10'>Featured places</h1>
                        <div className='flex featured-cities-container'>
                            {featuredCities.map((city, index) => (
                                <CityCard city={city} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className='other-items mt-32 mb-32'>
                        <h1 className='text-5xl'>Where about?</h1>
                        <div className='other-cities-container grid grid-cols-5'>
                            {otherCities.map((city, index) => (
                                <CityCard city={city} key={index} />
                            ))}
                        </div>
                    </div>
                </>
            )}

            <div className='paging'>
                {/* Add paging with when the page isnt already in DB to fetch the cities from API */}
            </div>  
        </div>
    )
}

export default Map;