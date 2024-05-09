import { useState, useEffect } from 'react';
import { fetchCitiesData } from '@utils/utils'; // Make sure to update the import to fetchCitiesData

export const useCities = (pageNumber = 1) => {
    const [featuredCities, setFeaturedCities] = useState([]);
    const [otherCities, setOtherCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCities = async () => {
            setIsLoading(true);
            try {
                const citiesData = await fetchCitiesData(pageNumber); // Fetch data for the current page
                if (citiesData && citiesData.length) {
                    setFeaturedCities(citiesData.slice(0, 5)); // Assumes top 5 cities are featured
                    setOtherCities(citiesData.slice(5)); // Rest are other cities
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
            setIsLoading(false);
        };

        getCities();
    }, [pageNumber]); // Effect runs when pageNumber changes

    return { featuredCities, otherCities, isLoading };
};