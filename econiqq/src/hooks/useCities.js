import { useState, useEffect } from 'react';
import { fetchCities } from '@utils/utils';

export const useCities = () => {
    const [featuredCities, setFeaturedCities] = useState([]);
    const [otherCities, setOtherCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCities = async () => {
            try {
                const sortedCities = await fetchCities();
                setFeaturedCities(sortedCities.slice(0, 5));
                setOtherCities(sortedCities.slice(5));
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
            setIsLoading(false);
        };

        getCities();
    }, []);

    return { featuredCities, otherCities, isLoading };
};