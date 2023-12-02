import toast from 'react-hot-toast';
import Link from 'next/link';

const API_ENDPOINT = 'https://cost-of-living-and-prices.p.rapidapi.com/prices';

const fetchCostOfLiving = async (country: string, capital: string) => {
  const url = `${API_ENDPOINT}?city_name=${capital}&country_name=${country}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPID_KEY,
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        // Rate limit exceeded
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error('Failed to fetch data from API');
      }
    }

    const responseData = await response.json();
    if (responseData.error) {
      // API returned an error, handle it without saving to Supabase
      toast.error(`API Error: This town is not in our search engine, try to contact us about it!`);
      throw new Error('API error occurred.');
    }

    return responseData;
  } catch (error) {
    // Handle any other errors during the API call
    throw new Error('Failed to fetch data from API');
  }
};


// function to refactore the date, for timezone, that is data originally fetched
export const fixDate = (date: Date): Date => new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

export default fetchCostOfLiving;