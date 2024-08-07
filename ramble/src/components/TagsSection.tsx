import React, { useState, useEffect } from 'react';
import StatsImage from './StatsImage';
import statsData from '../../public/stats.json';
import { fetchCountryCityCounts } from '@utils/utils';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const TagsSection = () => {
  const [counts, setCounts] = useState({ countryCount: 0, cityCount: 0 });
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const getCounts = async () => {
      const { countryCount, cityCount } = await fetchCountryCityCounts();
      setCounts({ countryCount, cityCount });
    };
    getCounts();
  }, []);

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
      <h1 className='tags-h1 text-center'>What you get with us?</h1>
      <div className="sm:block md:flex flex-wrap justify-center grid">
        <StatsImage
          icon="/assets/icons/globe_pink.png"
          count={counts.countryCount}
          count_start={0}
          label="countries"
          startCount={startCount}
        />
        {statsData.map((stat, index) => (
          <StatsImage
            key={index}
            icon={stat.icon}
            count={stat.count}
            count_start={stat.count_start}
            label={stat.label}
            startCount={startCount}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default TagsSection;
