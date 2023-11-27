"use client";

import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {

  const {country, capital} = useParams();
  console.log(country, capital);

  return (
    <div>
      
    </div>
  )
}

export default page
