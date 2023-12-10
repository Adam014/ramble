"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { fetchData } from '@utils/utils';
import { Toaster } from 'react-hot-toast';
import { MultiSelect } from "react-multi-select-component";

const Page = () => {
  // getting the country and capital from the url params
  const { country, capital } = useParams();

  // function for decoding the params to prevent any characters we dont want them there, better to have func because of overusage
  const decodeParam = (param: any) => (Array.isArray(param) ? param.join(' ') : decodeURIComponent(param));

  // variables for the decoded parameters
  const decodedCountry = decodeParam(country);
  const decodedCapital = decodeParam(capital);

  // states for the data fetching
  const [costOfLivingData, setCostOfLivingData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoring the fetched data from DB/API
  const memoizedFetchData = useMemo(() => fetchData(decodedCountry, decodedCapital), [decodedCountry, decodedCapital]);

  // Getting the memorized data, prevent re-getting
  useEffect(() => {
    const fetchDataFromUtils = async () => {
      try {
        // getting the data from the promise
        const data = await memoizedFetchData;
        setCostOfLivingData(data);
      } catch (error) {
        // setting error to its state
        setError(error.message);
      } finally {
        // setting loading to false
        setLoading(false);
      }
    };

    // fetching the data from Utils
    fetchDataFromUtils();
  }, [memoizedFetchData]);

  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
      // Assuming costOfLivingData is an object with a 'prices' property
      const prices = costOfLivingData?.data?.prices || [];
      
      // Extract unique category names
      const uniqueCategoryNames = Array.from(new Set(prices.map((price) => price.category_name)));

      // Create options array
      const categories = uniqueCategoryNames.map((categoryName) => ({
        label: categoryName,
        value: categoryName, // or use some unique identifier if available
      }));

      setOptions(categories);
    }, [costOfLivingData]);

  return (
    <div className='relative'>
      <div className="heading_container sm:pl-10 lg:pl-24 pt-24">
        <h1 className='head_text'>{decodedCountry}, {decodedCapital}</h1>
        {/* // TODO: Add a custom loading... */}
        {loading && <p className='p-24'>Loading...</p>}
        {error && <p className='p-24'>{error}</p>}
        {costOfLivingData && (
          <>
            <h3 className='text-4xl mt-10'>Select <span className='custom_font custom_color'>items/services</span></h3>
            {/* TODO: Add multi select, sort by, currency option */}
            {/* to view each Cost to Live, maybe use React Splide */}
            {/* Or just use simple table with each items from selected options */}
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              hasSelectAll={false}
              closeOnChangedValue={false}
              labelledBy="Select"
              className='select w-10/12 mt-5 text-black'
            />
          </>
        )}
      </div>
      <Toaster />
    </div>
  ); 
};

export default Page;
