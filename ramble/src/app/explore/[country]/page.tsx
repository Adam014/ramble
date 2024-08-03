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
    <>
      <div className="absolute top-1/4">
        {loading ? (
          <Loader />
        ) : cities.length > 0 ? (
          <div>
            <h1 className="text-5xl text-center">So, what now?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-6 gap-4 p-10">
              {cities.map((city) => (
                <Link href={`/explore/${city.country}/${city.city}`}>
                  <CityCard key={city.id} city={city} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <NoCity />
        )}
      </div>
    </>
  )
}

export default Country
