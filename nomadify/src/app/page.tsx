"use client";

import { useState, useEffect } from 'react';
import MapChart from "@components/Mapchart";
import { Tooltip as ReactToolTip} from "react-tooltip";
import Image from "next/image";
import ScrollingImage from '@components/Scroll';

export default function Home() {

  const [content, setContent] = useState("");
  const { isImageFixed, scrollPosition } = ScrollingImage();
  console.log(content);

  return (
    <>
      <Image 
        src="./assets/images/world-animate.svg"    
        alt='animation'
        width={600}
        height={600}
        style={{ top: isImageFixed ? 0 : scrollPosition + 'px' }}
        className={`world-animation object-fit ${isImageFixed ? 'fixed' : 'absolute'} right-0 m-40 xl:mr-10 lg:mr-0 md:-mr-40 sm:-mr-40`}
      />
      <section className='w-full flex-center flex-col p-10 pt-40 sm:pl-10 z-50'> 
        <h1 className='head_text'>Pocket Guide to the <br /><span className='custom_font'>Prices</span> of Life.</h1>
        <button className='button text-center'>EXPLORE 🡫</button>
        <h2 className="text-3xl mt-20">Nomad<span className="custom_color">ify</span></h2>
        <p className="text-xl mt-10 sm:w-1/2">is your personal passport to the planet's <span className="custom_font">price tags</span>. It's not just a web app; it's a whisperer for your wallet. Real-time data, tailor-made recommendations, and a community of kindred travelers make Nomadify your go-to guide for worldly adventures without the financial fuss.</p>
      </section>
      <div className="">
        <h2 className="text-3xl p-10 pt-40">Explore every <span className="custom_font custom_color">part</span> of the world</h2>
        {/* TODO: update the height of the map, bugging with the scrolling */}
        {/* Fix the tooltip, isnt showing */}
        <MapChart setTooltipContent={setContent} />
        <ReactToolTip>{content}</ReactToolTip>
      </div>
    </>
  )
}
