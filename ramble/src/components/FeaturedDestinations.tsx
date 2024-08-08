import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import FeaturedCityCard from './FeaturedCityCard';

const FeaturedDestinations = () => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });
      const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

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
            [as]
        </div>
    </motion.section>
  )
}

export default FeaturedDestinations
