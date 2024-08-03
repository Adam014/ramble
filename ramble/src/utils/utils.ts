import toast from 'react-hot-toast'
import supabase from './db/supabaseConfig'
import emailjs from 'emailjs-com'
import { useParams } from 'next/navigation'

interface EmailFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement
}

const API_ENDPOINT_TEMPLATE = 'https://cost-of-living-and-prices.p.rapidapi.com/prices';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPID_KEY;
const ERROR_MESSAGES = {
  RATE_LIMIT: 'API rate limit exceeded, we cant provide you detailed prices right now. Please try again later.',
  NOT_FOUND: "API ERROR: We don't seem to have this city detailed prices in our data!"
};

// function to refactor the date, for timezone, that is data originally fetched
export const fixDate = (date: Date): Date =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)

// WE NEED THIS FUNCTION FASTER
export const fetchCitiesData = async (pageNumber: number) => {
  // Check the database for existing data for the given page number
  try {
    const { data: existingData, error: fetchError } = await supabase
      .from('cities')
      .select('id, country, city, data, pageNum')
      .eq('pageNum', pageNumber)

    if (fetchError) {
      throw fetchError
    }

    // If data exists for this page, return it sorted by rank
    if (existingData && existingData.length > 0) {
      return existingData.sort((a, b) => a.data.rank - b.data.rank)
    }
  } catch (error) {
    console.error('Error fetching existing cities:', error.message)
    return null // Handle fetch error by returning null
  }
}

// Function to fetch city price data using country and city
export const fetchCityPriceDataFromAPI = async (country: string, city: string) => {
  const url = `${API_ENDPOINT_TEMPLATE}?city_name=${encodeURIComponent(city)}&country_name=${encodeURIComponent(country)}`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'cost-of-living-and-prices.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Handle specific errors
      let errorMessage;
      if (response.status === 404) {
        errorMessage = ERROR_MESSAGES.NOT_FOUND;
        toast.error(ERROR_MESSAGES.NOT_FOUND);
      } else if (response.status === 429) {
        errorMessage = ERROR_MESSAGES.RATE_LIMIT;
        toast.error(ERROR_MESSAGES.RATE_LIMIT);
      }
      throw new Error(errorMessage);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    // Display only the specific error message
    console.error('Error fetching city price data:', error.message);
    return null;
  }
};

// TODO: When the city is not in DB, use the toast NOT_FOUND but view the city bcs the api for detailed prices might be there -> dont show the first slide with overview
// Later with user account, users will be able to enter the overview info, images etc
export const fetchCityData = async (country: string, city: string) => {
  try {
    // Attempt to fetch existing data from the database
    const { data: existingData, error: fetchError } = await supabase
      .from('cities')
      .select('id, country, city, data, prices')
      .eq('country', country)
      .eq('city', city)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 indicates no row found
      console.error('Error fetching city data:', fetchError.message);
      return null;
    }

    // If existing data has prices, return it
    if (existingData?.prices) {
      return existingData;
    }

    // Fetch prices from the API
    const pricesData = await fetchCityPriceDataFromAPI(country, city);

    if (!pricesData) {
      console.error('Error fetching prices from API.');
      return existingData || null;
    }

    // If city data doesn't exist, insert new record with current timestamp
    if (!existingData) {
      const { data: newData, error: insertError } = await supabase
        .from('cities')
        .insert([{
          country,
          city,
          data: null,
          prices: pricesData,
          CreatedAt: new Date().toISOString() // Set current timestamp
        }])
        .select('id, country, city, data, prices')
        .single();

      if (insertError) {
        console.error('Error inserting new city data:', insertError.message);
        return null;
      }
      return newData;
    }

    // If city data exists but prices are missing, update the record
    const { error: updateError } = await supabase
      .from('cities')
      .update({ prices: pricesData })
      .eq('id', existingData.id);

    if (updateError) {
      console.error('Error updating prices in DB:', updateError.message);
      return existingData || null;
    }

    // Retrieve the updated data from the database
    const { data: updatedData, error: fetchUpdatedError } = await supabase
      .from('cities')
      .select('id, country, city, data, prices')
      .eq('id', existingData.id)
      .single();

    if (fetchUpdatedError) {
      console.error('Error fetching updated city data:', fetchUpdatedError.message);
      return existingData || null;
    }
    return updatedData;

  } catch (error) {
    console.error('Error fetching city data:', error.message);
    return null;
  }
};

export const fetchCitiesByCountry = async (country) => {
  try {
    const { data: citiesData, error: fetchError } = await supabase
      .from('cities')
      .select('id, country, city, data, prices')
      .eq('country', country)

    if (fetchError) {
      throw fetchError
    }

    return citiesData || [] // Return the fetched data or an empty array if not found
  } catch (error) {
    console.error('Error fetching cities data:', error.message)
    return [] // Handle fetch error by returning an empty array
  }
}


interface CountryCityCount {
  countryCount: number;
  cityCount: number;
}

export const fetchCountryCityCounts = async (): Promise<CountryCityCount> => {
  try {
    // Fetch unique countries count
    const { data: countryData, error: countryError } = await supabase
      .from('cities')
      .select('country', { count: 'exact' })

    if (countryError) {
      throw countryError
    }

    const countryCount = countryData?.length || 0

    // Fetch total cities count
    const { count: cityCount, error: citiesError } = await supabase
      .from('cities')
      .select('*', { count: 'exact', head: true })

    if (citiesError) {
      throw citiesError
    }

    return { countryCount, cityCount: cityCount || 0 }
  } catch (error) {
    console.error('Error fetching country and city counts:', error.message)
    return { countryCount: 0, cityCount: 0 }
  }
}

// function for sending the email
export const sendEmail = (e: EmailFormEvent): void => {
  e.preventDefault()

  emailjs.sendForm('nomadify_contact', 'template_fnex1n8', e.target, 'jI57JPoeSeH54Dm4S').then(
    () => {
      e.target.reset()
      toast.success('The email was sent!')
    },
    (error) => {
      console.log(error.text)
      toast.error('The email cannot be send...')
    }
  )
}

// function for getting the cost to live categories
export const getUniqueCategories = (prices = []) => {
  const uniqueCategoryNames = Array.from(new Set(prices.map((price) => price.category_name)))

  return uniqueCategoryNames.map((categoryName) => ({
    label: categoryName,
    value: categoryName
  }))
}

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
  const { country, capital } = useParams()
  const decodeParam = (param: any) =>
    Array.isArray(param) ? param.join(' ') : decodeURIComponent(param)
  return {
    country: decodeParam(country),
    city: decodeParam(capital)
  }
}
