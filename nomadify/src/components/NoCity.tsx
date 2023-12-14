import React from 'react';
import Link from 'next/link';

export const NoCity = () => {
  return (
    <>
            
        <h4 className='sm:text-2xl sm:m-5 lg:text-3xl lg:m-10 text-2xl m-5'>If you can't find the <span className='custom_font custom_color'>city</span> you are looking for, dont worry! <br /><br />Try to write in URL for example <code>/country/your_city</code> or just simply <span className='custom_font custom_color underline'><Link href="/contact">Contact us here</Link></span>!</h4>
    
    </>
  )
}
