"use client";

import Image from "next/image";
import ScrollingImage from '@components/Scroll';
import Link from "next/link";
import CountUp from 'react-countup';

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
        <h2 className="text-5xl mt-40">Statistics</h2>
        <div className="sm:block md:flex gap-5">
          {/* TODO: Add 4 statistics icons and numbers */}
          {/* TODO: Show here the cost of living data, create a design for it in figma */}
          {/* More than 200 countries, 54 subjects for Cost To Live, 17 currencies to view the Cost To Live, More than 8000 cities */}
          <div className="flex gap-5 items-center mt-20">
            <Image src="/assets/icons/globe_pink.png" height={50} width={50} alt="globe-icon"/>
            <h3 className="text-3xl"><CountUp end={200} duration={4}/>+ countries</h3>
          </div>
          <div className="flex gap-5 items-center mt-20">
            <Image src="/assets/icons/cost_pink.png" height={50} width={50} alt="cost-icon"/>
            <h3 className="text-3xl"><CountUp end={53} duration={4}/>+ items/services</h3>
          </div>
          <div className="flex gap-5 items-center mt-20">
            <Image src="/assets/icons/currency_pink.png" height={50} width={50} alt="currency-icon"/>
            <h3 className="text-3xl"><CountUp end={17} duration={4}/>+ currencies</h3>
          </div>
          <div className="flex gap-5 items-center mt-20">
            <Image src="/assets/icons/city_pink.png" height={50} width={50} alt="city-icon"/>
            <h3 className="text-3xl"><CountUp end={8000} duration={4}/>+ cities</h3>
          </div>
        </div>
      </section>
    </>
  )
}
