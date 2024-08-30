import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import FeaturedCityCard from './FeaturedCityCard';
import { fetchAndSelectFeaturedCities } from '@utils/utils'; 

const FeaturedDestinations = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });
  const [startCount, setStartCount] = useState(false);
  const [featuredCities, setFeaturedCities] = useState([]);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

useEffect(() => {
  const fetchCities = async () => {
    const cities = await fetchAndSelectFeaturedCities();
    if (cities) {
      setFeaturedCities(cities);
    }
  };

  // Fetch cities initially
  fetchCities();

  // Set an interval to fetch cities every 15 minutes (900000 milliseconds)
  const intervalId = setInterval(fetchCities, 900000);

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
}, []);

  return (
    <motion.section
      ref={ref}
      className="tags-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className='featured-container pt-36'>
        <h1 className='featured-h1'>Featured destinations by our nomads</h1>
        <div className="featured-cities">
          {featuredCities.map((city) => (
            <FeaturedCityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedDestinations;