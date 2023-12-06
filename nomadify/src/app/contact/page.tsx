"use client";

import React from 'react'
// import Image from 'next/image';
import ScrollingImage from '@components/Scroll';

const Contact = () => {
  // variables from getting the scrollPosition of website and if the image is Fixed or Absolute
  const { isImageFixed, scrollPosition } = ScrollingImage();

  return (
    <div className="relative">
      {/* <Image 
        src="/assets/images/contact-animate.svg" 
        height={600} 
        width={600} 
        alt='contact-animation' 
        style={{ top: isImageFixed ? 0 : scrollPosition + 'px' }}
        className={`contact-animation object-fit ${isImageFixed ? 'fixed' : 'absolute'} left-0`}
      />     */}
      {/* TODO: Add here contact form */}
      <div className='absolute top-28 lg:left-1/5'>
        <h1 className='lg:text-6xl text-3xl relative lg:left-1/3 left-10'>Share <span className='custom_font custom_color'>ideas</span> with us!</h1>
        <form>
          <div className="relative lg:left-1/3 top-10">
            <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-3 py-2 text-white bg-transparent outline-none border-b-2 shadow-sm"
                required
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact;