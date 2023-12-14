import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export const ArrowBack = () => {
  return (
    <>
        <Image src="/assets/images/circle1.png" height={100} width={250} alt="circle" className='absolute -top-2' />
        <Link href="/" className='text-xl'><h5 className='relative z-50'><span className='custom_font'>arrow</span> Return</h5></Link>
    </>
  )
}
