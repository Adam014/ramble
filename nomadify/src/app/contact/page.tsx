"use client";

import React from 'react'
import Image from 'next/image';
import ScrollingImage from '@components/Scroll';

const Contact = () => {
  const { isImageFixed, scrollPosition } = ScrollingImage();

  return (
    <div className="relative">
      <Image 
        src="/assets/images/contact-animate.svg" 
        height={600} 
        width={600} 
        alt='contact-animation' 
        style={{ top: isImageFixed ? 0 : scrollPosition + 'px' }}
        className={`contact-animation object-fit ${isImageFixed ? 'fixed' : 'absolute'} left-0 md:m-40`}
      />    
      {/* TODO: Add here contact form */}
    </div>
  )
}

export default Contact;
