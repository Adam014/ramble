"use client";

import React, {useState, useEffect} from 'react'
import { useParams } from 'next/navigation';
// import Image from 'next/image';
import fetchCostOfLiving from '@utils/fetchCostOfLiving';

const page = () => {

  const {country, capital} = useParams();

  const decodeParam = (param: any) => Array.isArray(param) ? param.join(' ') : decodeURIComponent(param);
  
  const decodedCountry = decodeParam(country);
  const decodedCapital = decodeParam(capital);

  const [costOfLivingData, setCostOfLivingData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCostOfLiving(decodedCountry, decodedCapital);
        setCostOfLivingData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [decodedCountry, decodedCapital]);

  console.log(costOfLivingData);

  // console.log(decodedCountry, decodedCapital); 

  return (
    <div className='relative'>
      <div className="heading_container">
        <h1 className='head_text sm:pl-10 lg:pl-24 pt-24'>📍 {decodedCountry}, {decodedCapital}</h1>
        {/* <Image 
          src="/assets/images/underline.png" 
          alt='underline' 
          width={600} // Set a reasonable width, this can be adjusted based on your design
          height={200} // Set a reasonable height, this can be adjusted based on your design      
        /> */}
        {error && <p className='p-24'>{error}</p>}
      </div>
    </div>
  )
}

export default page
