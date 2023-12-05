"use client";

import Image from "next/image";
import ScrollingImage from '@components/Scroll';
import Link from "next/link";

export default function Home() {
  // variables for image fixed and absolute 
  const { isImageFixed, scrollPosition } = ScrollingImage();

  return (
    <>
      {/* TODO: Add link to the image so clicking on the image will redirect you to the map */}
      <Image
        src="/assets/images/world-animate-second.svg"    
        alt='animation'
        width={600}
        height={600}
        style={{ top: isImageFixed ? 0 : scrollPosition + 'px' }}
        className={`world-animation object-fit ${isImageFixed ? 'fixed' : 'absolute'} right-0 m-40 xl:mr-10 lg:-mr-10 md:-mr-40 sm:-mr-40`}
      />      
      <section className='w-full flex-center flex-col p-10 pt-40 sm:pl-10 z-50'>     
        <h1 className='head_text'>Pocket Guide to the <br /><span className='custom_font'>Prices</span> of Life.</h1>
        <Link href="/map">
          <button className='button text-center'>EXPLORE 🡢</button>
        </Link>
        <h2 className="text-5xl mt-20"></h2>
        <div className="flex gap-10">
          {/* TODO: Add 4 statistics icons and numbers */}
          {/* TODO: Show here the cost of living data, create a design for it in figma */}
          {/* More than 200 countries, 54 subjects for Cost To Live, 17 currencies to view the Cost To Live, More than 8000 cities */}

        </div>
      </section>
    </>
  )
}
