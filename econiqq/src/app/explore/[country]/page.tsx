"use client"

import { ArrowBack } from '@components/ArrowBack';
import { NoCity } from '@components/NoCity';
import React from 'react';

// TODO: Need to edit this page, when only country is submitted
// Add carts with the towns of the country (country, capital, time, photo, and click button to redirect to the town)
// To je chytry tyvole

const country = () => {
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

export default country;
