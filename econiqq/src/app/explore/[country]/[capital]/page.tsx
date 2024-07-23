"use client";

import React, { useState, useEffect } from 'react';
import { useDecodedParams, fetchCityData } from '@utils/utils';

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
    return <div>Loading...</div>;
  }

  if (!cityData) {
    return <div>City not found.</div>;
  }

  return (
    <div className='relative'>
      <h1>{country}, {city}</h1>
    </div>
  );
};

export default Page;
