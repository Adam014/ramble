"use client"

import { ArrowBack } from '@components/ArrowBack';
import { NoCity } from '@components/NoCity';
import React from 'react';

const singleRecipe = () => {
  return (
    <>    
      <div className='absolute top-0 right-0 mr-50 m-10 back-button'>
          <ArrowBack />
      </div>
      <div className='absolute top-1/3'>
        <NoCity />
      </div>
    </>
  )
}

export default singleRecipe;
