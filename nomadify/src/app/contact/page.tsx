import React, { useEffect } from 'react'
import Image from 'next/image';

const Contact = () => {
  return (
    <div className="relative">
      <Image 
        src="/assets/images/contact-animate.svg" 
        height={500} 
        width={500} 
        alt='contact-animation' 
  
      />
    </div>
  )
}

export default Contact;
