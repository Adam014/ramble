"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import fetchCostOfLiving, { fixDate } from '@utils/utils';
import supabase from '@utils/db/supabaseConfig';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const { country, capital } = useParams();

  const decodeParam = (param: any) => (Array.isArray(param) ? param.join(' ') : decodeURIComponent(param));

  const decodedCountry = decodeParam(country);
  const decodedCapital = decodeParam(capital);

  const [costOfLivingData, setCostOfLivingData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();

  // TODO: Move this to utils.ts, to prevent better code readibility and structure
  // function for fetching the data from API/DB
  const fetchData = async () => {
    try {
      // Check if data exists in Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('CountryAndCapitalCollection') 
        .select()
        .eq('country', decodedCountry)
        .eq('capital', decodedCapital);
  
      if (supabaseError) {
        throw new Error('Error fetching data from Supabase');
      }
  
      if (supabaseData && supabaseData.length > 0) {
        // Data exists in Supabase, use it
        toast.success('Data loaded from Supabase!');
        console.log('Data fetched from Supabase:', supabaseData[0]);
        setCostOfLivingData(supabaseData[0]);
      } else {
        // Data does not exist in Supabase, fetch and save it
        try {
          const newData = await fetchCostOfLiving(decodedCountry, decodedCapital);
  
          // Save data to Supabase only if the API call was successful
          const { error: saveError } = await supabase
            .from('CountryAndCapitalCollection') 
            .upsert([
              {
                country: decodedCountry,
                capital: decodedCapital,
                data: newData,
                CreatedAt: fixDate(today),
              },
            ]);
  
          if (saveError) {
            throw new Error('Error saving data to Supabase');
          }
  
          // Use the fetched data
          toast.success('Data fetched from API and saved to Supabase!');
          console.log('Data saved to Supabase:', newData);
          setCostOfLivingData(newData);
        } catch (apiError) {
          // Handle API error without saving to Supabase
          if (apiError instanceof Error) {
            toast.error(apiError.message);
          } else {
            toast.error('An unexpected API error occurred.');
          }
        }
      }
    } catch (error) {
      // Handle other errors
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred, please be patient...');
      }
    } finally {
      setLoading(false);
    }
  };  

  // Memoring the fetched data from DB/API
  const memoizedFetchData = useMemo(() => fetchData, [decodedCountry, decodedCapital]);

  // Getting the memorized data, prevent re-getting
  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  console.log(costOfLivingData);

  return (
    <div className='relative'>
      <div className="heading_container">
        <h1 className='head_text sm:pl-10 lg:pl-24 pt-24'>📍 {decodedCountry}, {decodedCapital}</h1>
        {/* // TODO: Add a custom loading... */}
        {loading && <p className='p-24'>Loading...</p>}
        {error && <p className='p-24'>{error}</p>}
        {costOfLivingData && (
          <div>
            {/* TODO: Show here the cost of living data, create a design for it in figma */}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  ); 
};

export default Page;
