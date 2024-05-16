import { useState, useEffect } from 'react';
import { fetchCitiesData } from '@utils/utils'; 

export const useCities = (page) => {
    const [featuredCities, setFeaturedCities] = useState([]);
    const [otherCities, setOtherCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCities = async () => {
            setIsLoading(true);

            const citiesData = await fetchCitiesData(page); // Fetch data for the current page

            if (citiesData && citiesData.length) {
                setFeaturedCities(citiesData.slice(0, 5)); // Assumes top 5 cities are featured
                setOtherCities(citiesData.slice(5)); // Rest are other cities
            }
            setIsLoading(false);
        };

        getCities();
    }, [page]);

    return { featuredCities, otherCities, isLoading };
};