import { useState, useEffect } from 'react';
import { fetchCitiesData } from '@utils/utils'; 

export const useCities = (page) => {
    const [featuredCities, setFeaturedCities] = useState([]);
    const [otherCities, setOtherCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCities = async () => {
            setIsLoading(true);
            const cacheKey = `cities-page-${page}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                const citiesData = JSON.parse(cachedData);
                setFeaturedCities(citiesData.featuredCities);
                setOtherCities(citiesData.otherCities);
            } else {
                const citiesData = await fetchCitiesData(page);
                
                if (citiesData && citiesData.length) {
                    const featured = citiesData.slice(0, 5);
                    const other = citiesData.slice(5);
                    setFeaturedCities(featured);
                    setOtherCities(other);
                    localStorage.setItem(cacheKey, JSON.stringify({ featuredCities: featured, otherCities: other }));
                }
            }
            setIsLoading(false);
        };

        getCities();
    }, [page]);

    return { featuredCities, otherCities, isLoading };
};
