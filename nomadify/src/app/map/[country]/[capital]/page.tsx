"use client";

import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {

  const {country, capital} = useParams();

  const decodeParam = (param) => Array.isArray(param) ? param.join(' ') : decodeURIComponent(param);
  
  const decodedCountry = decodeParam(country);
  const decodedCapital = decodeParam(capital);

  console.log(decodedCountry, decodedCapital);

  return (
    <div className='relative'>
       <h1 className='head_text p-5'>{decodedCountry}, {decodedCapital}</h1>
    </div>
  )
}

export default page
