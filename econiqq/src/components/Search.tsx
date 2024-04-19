import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import mapData from '../../public/map.json';
import Image from 'next/image';
import searchIcon from "../../public/assets/icons/search.png";
import { Toaster, toast } from 'react-hot-toast';

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("E.g., Czech Republic, Prague");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Function to update placeholder every 15 seconds
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mapData.objects.world.geometries.length);
      const randomCountry = mapData.objects.world.geometries[randomIndex].properties.name;
      const randomCapital = mapData.objects.world.geometries[randomIndex].properties.capital;
      
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholder(`E.g., ${randomCountry}, ${randomCapital}`);
        setShowPlaceholder(true);
      }, 300); // Delay placeholder change to sync with CSS animation
    }, 10000); // Change placeholder every 15 seconds

    return () => {
      clearInterval(intervalId); // Cleanup function to clear interval when component unmounts
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = () => {
    const [country, capital] = searchValue.split(',').map(item => item.trim());

    if(country){
      router.push(`/explore/${country}`);
    }

    let formattedCountry: string;
    let formattedCapital: string ;

    if(country && capital){
      // Capitalize first letter of each word
      formattedCountry = country.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      formattedCapital = capital.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }
  
  
    if (formattedCountry && formattedCapital) {
      router.push(`/explore/${formattedCountry}/${formattedCapital}`);
    }
  };

  return (
    <div className="ml-10 mb-10">
      <Toaster />
      <div className="relative">
        <input
          type="text"
          className="input w-1/3 h-32 pl-15" // Added padding for the icon
          value={searchValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          style={{ paddingLeft: '50px' }} 
        />
        <Image
          src={searchIcon}
          alt="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          width={25}
          height={25} 
        />
      </div>
      <style jsx>{`
        input::placeholder {
          opacity: ${showPlaceholder ? 1 : 0};
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Search;
