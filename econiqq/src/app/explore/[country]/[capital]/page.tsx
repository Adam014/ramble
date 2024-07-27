"use client";

import React, { useState, useEffect } from 'react';
import { useDecodedParams, fetchCityData } from '@utils/utils';
import Tag from '@components/Tag';
import tagData from '../../../../../public/tags-single.json';
import Loader from '@components/Loader';

const Page = () => {
  const { country = '', city = '' }  = useDecodedParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (country && city) {
      const getCityData = async () => {
        const data = await fetchCityData(country, city);
        setCityData(data);
        setLoading(false);
      };

      getCityData();
    }
  }, [country, city]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='city-single-container'>
      <div className='city-single-title-container'>
        <h1 className='city-single-title'>{country}, {city}</h1>
        <div className='flex tags'>
            {loading
                ? <></>
                : tagData.map((tag, index) => <Tag key={index} icon={tag.icon} label={tag.label} />)
            }
        </div>
      </div>  
      {/* TODO: Here comes the slider/carousel with cards*/}
    </div>
  );
};

export default Page;
