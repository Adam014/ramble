"use client"

import React from 'react'
import { useParams } from 'next/navigation'

const singleRecipe = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      Single State  	
    </div>
  )
}

export default singleRecipe;
