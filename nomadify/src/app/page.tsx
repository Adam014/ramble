"use client";

// import Image from "next/image";
// import ScrollingImage from '@components/Scroll';
import Link from "next/link";
import StatsImage from "@components/StatsImage";

export default function Home() {

  return (
    <>
        {/* TODO: Add different bg  */}
      <section className='w-full flex-center flex-col p-10 pt-40 sm:pl-10 z-50'>     
        <h1 className='head_text'>Pocket Guide to the <br /><span className='custom_font'>Prices</span> of Life.</h1>
        <Link href="/map">
          <button className='button text-center'>EXPLORE 🡢</button>
        </Link>
        <h2 className="text-5xl mt-28 z-50 relative">Unleash Your Inner Nomad</h2>
        <p className="sm:w-11/12 md:w-1/2 pt-2">Deciding to explore the earth shouldn’t cost the earth! Can you afford that splendid solitude in Siberia or the charming chateaus of France? We’re here to turn your dreams into reality. With Nomadify, you're just a click away to know your cost.</p>
        <div className="sm:block lg:flex gap-20 -mt-10">
          {/* Custom styled components for the counting up animation, better for overusage */}
          <StatsImage icon="/assets/icons/globe_pink.png" count={200} label="countries" />
          <StatsImage icon="/assets/icons/cost_pink.png" count={53} label="items/services" />
          <StatsImage icon="/assets/icons/currency_pink.png" count={17} label="currencies" />
          <StatsImage icon="/assets/icons/city_pink.png" count={8000} label="cities" />
        </div>  	

      </section>
    </>
  )
}
