"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { sendEmail } from '@utils/utils';

const Contact = () => {
  return (
    <div className="relative">
      <Toaster />
      <Image 
        src="/assets/images/contact-animate.svg" 
        height={700} 
        width={700} 
        alt='contact-animation' 
        className={`contact-animation object-fit absolute right-0 mt-10 mr-40`}
      />    
      {/* TODO: Add here contact form */}
      <div className='contact-container absolute top-28 left-20'>
        <h1 className='lg:text-6xl text-3xl relative'>Share <span className='custom_font custom_color'>ideas</span> with us!</h1>
        <form className='relative top-8' onSubmit={sendEmail}>
          <div className="mb-10 w-full">
            <input
                type="text"
                placeholder="First name"
                className="w-full pl-4 pr-3 py-2 text-white bg-transparent outline-none border-b-2 shadow-sm"
                name='from_name'
                required
            />
          </div>
          <div className="relative mb-10 w-full">
            <input
                type="text"
                placeholder="Last name"
                name='from_surname'
                className="w-full pl-4 pr-3 py-2 text-white bg-transparent outline-none border-b-2 shadow-sm"
            />
          </div>
          <div className="relative w-full">
            <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-3 py-2 text-white bg-transparent outline-none border-b-2 shadow-sm"
                name='from_email'
                required
            />
          </div><br /><br />
          <div className="relative">
            <textarea
                placeholder="Enter your message"
                className="w-full pl-4 pr-3 py-2 text-white bg-transparent outline-none border shadow-sm"
                required
                name='html_message'
            />
          </div><br />
          <button className='mt-5 w-full button-contact'>Send</button>
          <p className='flex p-10 justify-center'>Powered with <Link href="/"><Image src="/assets/images/nomadify.svg" height={90} width={90} alt="logo" className='ml-3 mt-2' /></Link></p>
        </form>
      </div>
    </div>
  )
}

export default Contact;