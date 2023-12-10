"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { fetchData, getCurrencies, getUniqueCategories } from '@utils/utils';
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

  // console.log(costOfLivingData);

  const [selected, setSelected] = useState([]);

  // states for getting the unique cost to live categories
  const [optionsCategory, setCategoryOptions] = useState([]);

  // states for getting currencies
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions);
  // console.log(optionsCategory);

  useEffect(() => {
    const prices = costOfLivingData?.data?.prices || [];
    const exchangeRates = costOfLivingData?.data?.exchange_rate || {};

    const categories = getUniqueCategories(prices);
    const currencies = getCurrencies(exchangeRates);

    setCategoryOptions(categories);
    setCurrencyOptions(currencies);

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
            <MultiSelect
              options={optionsCategory}
              value={selected}
              onChange={setSelected}
              hasSelectAll={false}
              closeOnChangedValue={false}
              labelledBy="Select"
              className='w-10/12 mt-5 text-black'
            />
            {/* TODO: Add default value as USD */}
            <select className='select text-black p-2 mt-5'>  
              {currencyOptions.map((currency, index) => (
                <option key={index} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <Toaster />
    </div>
  ); 
};

export default Page;
