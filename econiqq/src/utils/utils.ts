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

export const fetchCitiesData = async () => {
  const url = `${API_ENDPOINT}?page=1&limit=25`;

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
      // API returned an error, handle it without saving to Supabase
      toast.error(ERROR_MESSAGES.NOT_FOUND);
      throw new Error(`API Error: ${responseData.error}`);
    }

    // Save each city's data to Supabase
    const citiesData = responseData.cities; // Assuming the cities data is under responseData.data

    await Promise.all(citiesData.map(async city => {
      try {
        const { data, error } = await supabase
          .from('cities')
          .insert([
            {
              country: city.country,
              city: city.name,
              data: city,
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
    // Handle any other errors during the API call
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

export const fetchCities = async () => {
  try {
      const { data, error } = await supabase
          .from('cities')
          .select('id, country, city, data, prices');

      if (error) {
          throw error;
      }

      if (data){
          const sortedData = data.sort((a, b) => a?.data?.rank - b?.data?.rank);
          return sortedData;
      }

  } catch (error) {
      console.error('Error fetching cities:', error.message);
      return null; // Return null in case of error
  }
};