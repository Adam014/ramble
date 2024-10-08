import React, { useEffect, useState } from 'react'
import FeaturedCityCard from '@components/cards/FeaturedCityCard'
import { fetchAndSelectFeaturedCities } from '@utils/utils'
import Link from 'next/link'

const FeaturedDestinations = () => {
  const [featuredCities, setFeaturedCities] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await fetchAndSelectFeaturedCities()
      if (cities) {
        setFeaturedCities(cities)
      }
    }

    // Fetch cities initially
    fetchCities()

    // Set an interval to fetch cities every 15 minutes (900000 milliseconds)
    const intervalId = setInterval(fetchCities, 900000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="featured-container pb-20">
      <h1 className="featured-h1 pb-10">Featured destinations by our nomads</h1>
      <div className="featured-cities">
        {featuredCities.map((city) => (
          <FeaturedCityCard key={city.id} city={city} />
        ))}
      </div>
      <div className="featured-button-container">
        <Link href="/explore">
          <button className="featured-button">Check it out!</button>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedDestinations
