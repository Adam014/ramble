import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import supabase from './db/supabaseConfig';
import emailjs from "emailjs-com";
import { useParams } from 'next/navigation';

interface EmailFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

// RAPIDAPI Endpoint
const API_ENDPOINT = 'https://nomadlist-digital-nomad-travel-api.p.rapidapi.com/cities';

// RAPIDAPI_KEY, getting from .env
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPID_KEY;

// Declaring error messages
const ERROR_MESSAGES = {
  RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
  GENERIC: 'API ERROR: The API is down, please be patient...',
  NOT_FOUND: "API ERROR: We don't seem to have this city in our data!",
};

// function to refactor the date, for timezone, that is data originally fetched
export const fixDate = (date: Date): Date => new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

export const fetchCitiesData = async (pageNumber: number) => {
  // Check the database for existing data for the given page number
  try {
    const { data: existingData, error: fetchError } = await supabase
      .from('cities')
      .select('id, country, city, data, pageNum')
      .eq('pageNum', pageNumber);

    if (fetchError) {
      throw fetchError;
    }

    // If data exists for this page, return it sorted by rank
    if (existingData && existingData.length > 0) {
      console.log("Found the data already in DB..")
      return existingData.sort((a, b) => a.data.rank - b.data.rank);
    }
  } catch (error) {
    console.error('Error fetching existing cities:', error.message);
    return null; // Handle fetch error by returning null
  }

  // Data not found in the database, proceed with API fetch
  const url = `${API_ENDPOINT}?page=${pageNumber}&limit=25`;

  try {
    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key is not defined.');
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'nomadlist-digital-nomad-travel-api.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      const errorMessage =
        response.status === 429
          ? ERROR_MESSAGES.RATE_LIMIT
          : ERROR_MESSAGES.GENERIC;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    if (responseData.error) {
      toast.error(ERROR_MESSAGES.NOT_FOUND);
      throw new Error(`API Error: ${responseData.error}`);
    }

    const citiesData = responseData.cities;
    console.log("New page fetched", responseData);

    // Insert new city data into the database
    await Promise.all(citiesData.map(async city => {
      try {
        const { data, error } = await supabase
          .from('cities')
          .insert([
            {
              country: city.country,
              city: city.name,
              data: city,
              pageNum: pageNumber,
              CreatedAt: new Date(),
            },
          ]);
        
        if (error) {
          throw new Error(`Failed to save data for ${city.name} to Supabase: ${error.message}`);
        }
      } catch (error) {
        console.error('Error saving city data to Supabase:', error);
      }
    }));

    return responseData;
  } catch (error) {
    console.error('API Call Error:', error);
    throw new Error('Failed to fetch data from API');
  }
};

// function for sending the email
export const sendEmail = (e: EmailFormEvent): void => {
  e.preventDefault();

  emailjs.sendForm('nomadify_contact', 'template_fnex1n8', e.target, 'jI57JPoeSeH54Dm4S')
    .then(() => {
        e.target.reset();
        toast.success("The email was sent!");
    }, (error) => {
        console.log(error.text);
        toast.error("The email cannot be send...")
    });     
}

// function for getting the cost to live categories
export const getUniqueCategories = (prices = []) => {
  const uniqueCategoryNames = Array.from(new Set(prices.map((price) => price.category_name)));

  return uniqueCategoryNames.map((categoryName) => ({
    label: categoryName,
    value: categoryName, 
  }));
};

// // function for getting the currencies
// export const getCurrencies = (exchangeRates = {}) => {
//   const currencies = Object.entries(exchangeRates).map(([currencyCode, exchangeRate]) => ({
//     label: currencyCode,
//     value: exchangeRate,
//   }));

//   // Sort the currencies array to put the currency with value 1 at the top
//   currencies.sort((a, b) => (a.value === 1 ? -1 : b.value === 1 ? 1 : 0));

//   return currencies;
// };

export const useDecodedParams = () => {
  const { country, capital } = useParams();
  const decodeParam = (param: any) => (Array.isArray(param) ? param.join(' ') : decodeURIComponent(param));
  return {
    decodedCountry: decodeParam(country),
    decodedCapital: decodeParam(capital),
  };
};