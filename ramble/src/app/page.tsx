"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import StatsImage from '@components/StatsImage'
import BackgroundVideo from '@components/BackgroundVideo'
import statsData from '../../public/stats.json'
import { fetchCountryCityCounts } from '@utils/utils' // Adjust the path as necessary

export default function Home() {
  const [counts, setCounts] = useState({ countryCount: 0, cityCount: 0 })

  useEffect(() => {
    const getCounts = async () => {
      const { countryCount, cityCount } = await fetchCountryCityCounts()
      setCounts({ countryCount, cityCount })
    }
    getCounts()
  }, [])

  return (
    <>
      <section className="w-full flex-center justify-center flex-col p-10 pt-10 sm:pl-10 z-50">
        <BackgroundVideo />
        <h1 className="head_text text-center">Explore. Dream. Ramble.</h1>
        <div className="flex justify-center mt-10">
          <Link href="/explore">
            <button className="button text-center">EXPLORE 🡢</button>
          </Link>
        </div>
        <h2 className="text-5xl mt-20 z-50 relative text-center">
          Catch the trade winds in your sails.
        </h2>
        <p className="pt-10 text-2xl text-center mt-10">
          Deciding to explore the earth shouldn’t cost the earth! Can you afford that splendid
          solitude in Siberia or the charming chateaus of France? We’re here to turn your dreams
          into reality. With Ramble, you're just a click away to know your cost.
        </p>
        <div className="sm:block md:flex flex-wrap justify-center grid">
          <StatsImage
            icon="/assets/icons/globe_pink.png"
            count={counts.countryCount}
            count_start={0}
            label="countries"
          />
          {statsData.map((stat, index) => (
            <StatsImage
              key={index}
              icon={stat.icon}
              count={stat.count}
              count_start={stat.count_start}
              label={stat.label}
            />
          ))}
          <StatsImage
            icon="/assets/icons/city_pink.png"
            count={counts.cityCount}
            count_start={0}
            label="cities"
          />
        </div>
      </section>
    </>
  )
}
