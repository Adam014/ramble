'use client'

import { NoCity } from '@components/NoCity'
import React, { useEffect, useState } from 'react'
import { fetchCitiesByCountry, useDecodedParams } from '@utils/utils'
import CityCard from '@components/CityCard'
import Loader from '@components/Loader'
import Link from 'next/link'

const Country = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const { country } = useDecodedParams()

  useEffect(() => {
    if (country) {
      const getCities = async () => {
        const citiesData = await fetchCitiesByCountry(country)
        setCities(citiesData)
      }

      getCities()
    }
  }, [country])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col">
        {loading ? (
          <Loader />
        ) : cities.length > 0 ? (
          <div className="flex-grow">
            <h1 className="text-5xl country-title">So, where to now?</h1>
            <div className="city-grid">
              {cities.map((city) => (
                <Link href={`/explore/${city.country}/${city.city}`} key={city.id}>
                  <CityCard city={city} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <NoCity />
        )}
      </div>
    </div>
  );
}

export default Country