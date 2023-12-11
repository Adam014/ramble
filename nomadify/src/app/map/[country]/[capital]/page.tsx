"use client";

import React, { useState, useEffect } from 'react';
import { useDataFetching, getCurrencies, getUniqueCategories, useDecodedParams } from '@utils/utils';
import { Toaster } from 'react-hot-toast';
import { MultiSelect } from "react-multi-select-component";

const Page = () => {
  const { decodedCountry, decodedCapital } = useDecodedParams();
  const { data: costOfLivingData, error, loading } = useDataFetching(decodedCountry, decodedCapital);

  const [selected, setSelected] = useState([]);
  const [optionsCategory, setCategoryOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);

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
      <div className="heading_container pl-5 md:p-10 lg:pl-24 pt-24">
        <h1 className='head_text'>{decodedCountry}, {decodedCapital}</h1>
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
              className='w-10/12 mt-5 text-black appearance-none'
            />
            <select className='select select_custom_arrow text-black p-2 mt-5'>
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
