"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import mapData from '../../public/map.json'
import BackgroundVideo from '@components/BackgroundVideo';
import TagsSection from '@components/TagsSection';
import FeaturedDestinations from '@components/FeaturedDestinations';

export default function Home() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState('E.g., Czech Republic, Prague')
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      {/* looks like shit now, need to finish this */}
      <BackgroundVideo />
      <div className={`title-container ${isScrolled ? 'black-bg' : ''}`}>
        <section className="w-full flex flex-col items-center p-10 pt-10 relative z-50">
          <h1 className="text-6xl font-bold text-center">Explore. Dream. Ramble.</h1>
          <div className="flex justify-center mt-20 w-full">
            <div className="input-container relative w-full max-w-3xl pt-20">
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
                className="title-button absolute right-4 transform -translate-y-1/2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full py-2 px-4 transition-all"
              >
                Go
              </button>
            </div>
          </div>
          <p className="title-description p-10 text-4xl w-full text-center mt-10">
            "Easily explore new destinations and find out the cost of living with our app. Plan your travels and budget effortlessly—discover where to go and what to expect!"
          </p>
          <div id="mouse-scroll">
            <div className="mouse">
              <div className="mouse-in"></div>
            </div>
            <div>
                <span className="down-arrow-1"></span>
                <span className="down-arrow-2"></span>
                <span className="down-arrow-3"></span>
            </div>
          </div>
          <style jsx>{`
            input::placeholder {
              opacity: ${showPlaceholder ? 1 : 0};
              transition: opacity 0.3s ease-in-out;
            }
          `}</style>
        </section>
      </div>
      <TagsSection />
      {/* <FeaturedDestinations />  	 */}
    </>
  );
}
