const API_ENDPOINT = 'https://cost-of-living-and-prices.p.rapidapi.com/prices';

const fetchCostOfLiving = async (country: string, capital: string) => {
  const url = `${API_ENDPOINT}?city_name=${capital}&country_name=${country}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPID_KEY,
		'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
    },
  });

  if (!response.ok) {
    if (response.status === 429) {
      // Rate limit exceeded
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error('Failed to fetch data');
    }
  }

  return response.json();
};

export const fixDate = (date: Date) => {
  let dateLocal = new Date(date);
  let newDate = new Date(
    dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
  );
  return newDate;
};

export default fetchCostOfLiving;