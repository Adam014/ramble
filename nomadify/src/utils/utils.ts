import toast from 'react-hot-toast';

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
      const errorMessage =
        response.status === 429
          ? 'API rate limit exceeded. Please try again later.'
          : 'API ERROR: The API is down, please be patient...';

      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    if (responseData.error) {
      // API returned an error, handle it without saving to Supabase
      toast.error("API ERROR: We don't seem to have this city in our data!");
      throw new Error(`API Error: We dont seem to have this city in our data!${responseData.error.message}`);
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