import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import supabase from './db/supabaseConfig';
import emailjs from "emailjs-com";
import { useParams } from 'next/navigation';

interface EmailFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

// RAPIDAPI Endpoint
const API_ENDPOINT = 'https://cost-of-living-and-prices.p.rapidapi.com/prices';

// RAPIDAPI_KEY, getting from .env
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPID_KEY;

// Declaring error messages
const ERROR_MESSAGES = {
  RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
  GENERIC: 'API ERROR: The API is down, please be patient...',
  NOT_FOUND: "API ERROR: We don't seem to have this city in our data!",
};

// Declaring the function for getting the data from the API
const fetchCostOfLiving = async (country: string, capital: string) => {
  const url = `${API_ENDPOINT}?city_name=${capital}&country_name=${country}`;

  try {
    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key is not defined.');
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
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
      throw new Error(`API Error: We don't seem to have this city in our data! ${responseData.error.message}`);
    }

    return responseData;
  } catch (error) {
    // Handle any other errors during the API call
    console.error('API Call Error:', error);
    throw new Error('Failed to fetch data from API');
  }
};

// function to refactor the date, for timezone, that is data originally fetched
export const fixDate = (date: Date): Date => new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

// function for fetching the data from the DB/API
export const fetchData = async (decodedCountry: string, decodedCapital: string) => {
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
      return supabaseData[0];
    } else {
      // Data does not exist in Supabase, fetch and save it
      const newData = await fetchCostOfLiving(decodedCountry, decodedCapital);

      // Save data to Supabase only if the API call was successful
      const { error: saveError } = await supabase
        .from('CountryAndCapitalCollection') 
        .upsert([
          {
            country: decodedCountry,
            capital: decodedCapital,
            data: newData,
            CreatedAt: fixDate(new Date()),
          },
        ]);

      if (saveError) {
        throw new Error('Error saving data to Supabase');
      }

      // Use the fetched data
      toast.success('Data fetched from API and saved to Supabase!');
      return newData;
    }
  } catch (error) {
    // Handle other errors
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred, please be patient...');
    }
  }
};

// function for sending the email
export const sendEmail = (e: EmailFormEvent): void => {
  e.preventDefault();

  emailjs.sendForm('nomadify_contact', 'template_fnex1n8', e.target, 'jI57JPoeSeH54Dm4S')
    .then((result) => {
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

// function for getting the currencies
export const getCurrencies = () => {

};

export const useDecodedParams = () => {
  const { country, capital } = useParams();
  const decodeParam = (param: any) => (Array.isArray(param) ? param.join(' ') : decodeURIComponent(param));
  return {
    decodedCountry: decodeParam(country),
    decodedCapital: decodeParam(capital),
  };
};

export const useDataFetching = (country: string, capital: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDataFromUtils = useCallback(async () => {
    try {
      const result = await fetchData(country, capital);
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [country, capital]);

  useEffect(() => {
    fetchDataFromUtils();
  }, [fetchDataFromUtils]);

  return { data, error, loading };
};