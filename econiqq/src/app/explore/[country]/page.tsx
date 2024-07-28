"use client"

import { NoCity } from '@components/NoCity';
import React, { useEffect, useState } from 'react';
import { fetchCitiesByCountry, useDecodedParams } from '@utils/utils';
import CityCard from '@components/CityCard';
import Loader from '@components/Loader';
import Link from 'next/link';

const Country = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { country } = useDecodedParams();

  useEffect(() => {
    if (country) {
      const getCities = async () => {
        setLoading(true);
        const citiesData = await fetchCitiesByCountry(country);
        setCities(citiesData);
        setLoading(false);
      };

      getCities();
    }
  }, [country]);

  return (
    <>
      <div className='absolute top-1/4'>
        <h1 className='text-5xl text-center'>So, what now?</h1>
        {loading ? (
          <Loader /> 
        ) : cities.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10'>
            {cities.map((city) => (
               <Link href={`/explore/${city.country}/${city.city}`}>
                <CityCard key={city.id} city={city} />
              </Link>
            ))}
          </div>
        ) : (
          <NoCity />
        )}
      </div>
    </>
  );
}

export default Country;
