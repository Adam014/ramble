"use client";

import React, { useEffect, useState } from 'react';
import { useCities } from '@hooks/useCities'; 

import tagData from '../../../public/tags.json';

import Search from '@components/Search';
import Tag from '@components/Tag';
import CityCard from '@components/CityCard';
import Loader from "@components/Loader";
import ReactPaginate from 'react-paginate';

const Map = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { featuredCities, otherCities, isLoading } = useCities(currentPage + 1); // Use custom hook to manage city data

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // TODO:
    // Need to resolve bug when fetching new data, the page must be refreshed to see the new cities

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

            {/* Add paging with when the page isnt already in DB to fetch the cities from API */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                previousLabel="< previous"
                pageRangeDisplayed={5}
                pageCount={69}
                marginPagesDisplayed={2}
                containerClassName='pagination-container'
                activeClassName="active"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Map;