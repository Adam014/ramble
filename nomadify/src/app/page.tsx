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
        src="./assets/images/world-animate.svg"    
        alt='animation'
        width={600}
        height={600}
        style={{ top: isImageFixed ? 0 : scrollPosition + 'px' }}
        className={`world-animation ${isImageFixed ? 'fixed' : 'absolute'} right-0 m-40 xl:mr-10 lg:-mr-10 md:-mr-40 sm:-mr-40`}
      />
      <section className='w-full flex-center flex-col p-10 pt-40 sm:pl-10 z-50'>     
        <h1 className='head_text'>Pocket Guide to the <br /><span className='custom_font'>Prices</span> of Life.</h1>
        <Link href="/map">
          <button className='button text-center'>EXPLORE 🡢</button>
        </Link>
        <h2 className="text-3xl mt-20">Nomad<span className="custom_color">ify</span></h2>
        <p className="text-xl mt-10 sm:w-1/2">is your personal passport to the planet's <span className="custom_font">price tags</span>. It's not just a web app; it's a whisperer for your wallet. Real-time data, tailor-made recommendations, and a community of kindred travelers make Nomadify your go-to guide for worldly adventures without the financial fuss.</p>
      </section>
    </>
  )
}
