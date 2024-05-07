"use client";

import React from 'react';
import { useCities } from '@hooks/useCities'; // A new custom hook for fetching cities

import tagData from '../../../public/tags.json';

import Search from '@components/Search';
import Tag from '@components/Tag';
import CityCard from '@components/CityCard';
import Loader from "@components/Loader";

const Map = () => {
    const { featuredCities, otherCities, isLoading } = useCities(); // Use custom hook to manage city data

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
        </div>
    )
}

export default Map;