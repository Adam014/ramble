"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatsImage from '@components/StatsImage';
import mapData from '../../public/map.json'
import BackgroundVideo from '@components/BackgroundVideo';
import statsData from '../../public/stats.json';
import { fetchCountryCityCounts } from '@utils/utils';

export default function Home() {
  const [counts, setCounts] = useState({ countryCount: 0, cityCount: 0 });
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState('E.g., Czech Republic, Prague')
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  useEffect(() => {
    const getCounts = async () => {
      const { countryCount, cityCount } = await fetchCountryCityCounts();
      setCounts({ countryCount, cityCount });
    };
    getCounts();
  }, []);

  useEffect(() => {
    // Function to update placeholder every 15 seconds
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mapData.objects.world.geometries.length)
      const randomCountry = mapData.objects.world.geometries[randomIndex].properties.name
      const randomCapital = mapData.objects.world.geometries[randomIndex].properties.capital

      setShowPlaceholder(false)
      setTimeout(() => {
        setPlaceholder(`E.g., ${randomCountry}, ${randomCapital}`)
        setShowPlaceholder(true)
      }, 300) // Delay placeholder change to sync with CSS animation
    }, 10000) // Change placeholder every 15 seconds

    return () => {
      clearInterval(intervalId) // Cleanup function to clear interval when component unmounts
    }
  }, [])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = () => {
    const [country, city] = searchValue.split(',').map((item) => item.trim());

    if (country) {
      router.push(`/explore/${country}`);
    }

    if (country && city) {
      const formattedCountry = country.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      const formattedCity = city.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      router.push(`/explore/${formattedCountry}/${formattedCity}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <section className="w-full flex flex-col items-center p-10 pt-10 relative z-50">
        <BackgroundVideo />
        <h1 className="text-6xl font-bold text-center">Explore. Dream. Ramble.</h1>
        <div className="flex justify-center mt-20 w-full">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="input-title w-full p-8 text-lg text-black border-none shadow-lg transition-all"
            />
            <button
              onClick={handleSubmit}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full py-2 px-4 transition-all"
            >
              Go
            </button>
          </div>
        </div>
        {/* <h2 className="text-5xl mt-20 z-50 relative text-center">Catch the trade winds in your sails.</h2> */}
        <p className="title-description p-10 text-4xl w-full text-center mt-10">
          "Easily explore new destinations and find out the cost of living with our app. Plan your travels and budget effortlessly—discover where to go and what to expect!"
        </p>
        <div className="sm:block md:flex flex-wrap justify-center grid">
          <StatsImage
            icon="/assets/icons/globe_pink.png"
            count={counts.countryCount}
            count_start={0}
            label="countries"
          />
          {statsData.map((stat, index) => (
            <StatsImage
              key={index}
              icon={stat.icon}
              count={stat.count}
              count_start={stat.count_start}
              label={stat.label}
            />
          ))}
          <StatsImage
            icon="/assets/icons/city_pink.png"
            count={counts.cityCount}
            count_start={0}
            label="cities"
          />
        </div>
        <style jsx>{`
          input::placeholder {
            opacity: ${showPlaceholder ? 1 : 0};
            transition: opacity 0.3s ease-in-out;
          }
      `}</style>
      </section>
    </>
  );
}