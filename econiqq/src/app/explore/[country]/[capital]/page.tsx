"use client";

import React from 'react';
import { useDecodedParams } from '@utils/utils';

const Page = () => {
  const { country = '', city = '' }  = useDecodedParams();

  return (
    <div className='relative'>
      <h1>{country}, {city}</h1>
    </div>
  );
};

export default Page;
