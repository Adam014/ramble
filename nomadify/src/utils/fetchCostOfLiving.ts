const API_ENDPOINT = 'https://cost-of-living-and-prices.p.rapidapi.com/prices';

const fetchCostOfLiving = async (country: string, capital: string) => {
  const url = `${API_ENDPOINT}?city_name=${capital}&country_name=${country}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': 'd6850ca347mshb135b00f6e9f6b2p109ccejsnf924080e2e9b',
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

export default fetchCostOfLiving;