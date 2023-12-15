"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useDataFetching, getCurrencies, getUniqueCategories, useDecodedParams } from '@utils/utils';
import { Toaster } from 'react-hot-toast';
import { MultiSelect } from "react-multi-select-component";
import CurrencySelect from '@components/CurrencySelect';
// import Image from 'next/image';

const Page = () => {
  const { decodedCountry, decodedCapital } = useDecodedParams();
  const { data: costOfLivingData, error, loading } = useDataFetching(decodedCountry, decodedCapital);
  console.log(costOfLivingData);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [optionsCategory, setCategoryOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    // Determine the data source
    const sourceData = costOfLivingData?.data || costOfLivingData || {};
    
    const prices = sourceData.prices || [];
    const exchangeRates = sourceData.exchange_rate || {};
    const categories = getUniqueCategories(prices);
    const currencies = getCurrencies(exchangeRates);

    // Set the state once at the end
    setCategoryOptions(categories);
    setCurrencyOptions(currencies);
  }, [costOfLivingData]);

  const handleCurrencyChange = useCallback((e) => {
    setSelectedCurrency(e.target.value);
  }, []);

  return (
    <div className='relative'>
      <div className="heading_container pl-10 md:p-10 lg:pl-24 pt-24">
        <h1 className='head_text'>{decodedCountry}, {decodedCapital}</h1>
        {loading && <p className='p-24'>Loading...</p>}
        {error && <p className='p-24'>{error}</p>}
        {costOfLivingData ? (
          <>
            <h3 className='text-4xl mt-10'>Select <span className='custom_font custom_color'>items/services</span></h3>
            <MultiSelect
              options={optionsCategory}
              value={selectedCategory}
              onChange={setSelectedCategory}
              hasSelectAll={false}
              closeOnChangedValue={false}
              labelledBy="Select"
              className='w-10/12 mt-5 text-black appearance-none'
            />
            {/* TODO: Add actual value of the select and then onCHange for changing */}
            <CurrencySelect
              options={currencyOptions}
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            />
          </>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
};

export default Page;
