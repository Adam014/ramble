"use client";

import React, { useState, useEffect } from 'react';
import { useDataFetching, getCurrencies, getUniqueCategories, useDecodedParams } from '@utils/utils';
import { Toaster } from 'react-hot-toast';
import { MultiSelect } from "react-multi-select-component";
import CurrencySelect from '@components/CurrencySelect';
import ItemCard from '@components/ItemCard';

const Page = () => {
  const { decodedCountry = '', decodedCapital = '' }  = useDecodedParams();
  const { data: costOfLivingData, error, loading } = useDataFetching(decodedCountry, decodedCapital);
  // console.log(costOfLivingData);

  const costOfLivingItems = costOfLivingData?.data?.prices || costOfLivingData?.prices || {};

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [optionsCategory, setCategoryOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  console.log(currencyOptions);

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

  return (
    <div className='relative'>
      <div className="heading_container pl-5 md:p-10 lg:pl-12">
        <h1 className='head_text'>{decodedCountry}, {decodedCapital}</h1>
        {/* TODO: Custom loader */}
        {loading && <p className='text-2xl p-32 flex items-center'> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>Loading...</p>}
        {error && <p className='p-24'>{error}</p>}
        {costOfLivingData ? (
          <>
            <h3 className='text-4xl mt-10'>Select <span className='custom_font custom_color'>items/services</span></h3>
            <MultiSelect
              options={optionsCategory}
              value={selectedCategory}
              onChange={setSelectedCategory}
              hasSelectAll={true}
              closeOnChangedValue={false}
              labelledBy="Select"
              className='w-10/12 mt-5 text-black appearance-none'
            />
            {/* TODO: Need to resolve, how we will convert the currencies */}
            {/* <CurrencySelect
              options={currencyOptions}
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            /> */}
            <div className='mt-10'>
              {costOfLivingItems && selectedCategory.length > 0 ? (
                // Filtering throught the items to show only that match the selected category
                <ItemCard
                  data={costOfLivingItems.filter(item =>
                    selectedCategory.some(category => category.value === item.category_name)
                  )}
                  selectedCurrency={selectedCurrency}
                />
              ) :
                <p className='pt-24 text-xl'>Please select at least one of the <span className='custom_font custom_color'>categories</span> in the MultiSelect</p>
              }
            </div>
          </>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
};

export default Page;
