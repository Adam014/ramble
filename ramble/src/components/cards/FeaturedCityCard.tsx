import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getWeatherEmoji } from '@utils/utils'

const FeaturedCityCard = ({ city }) => {
  return (
    <Link href={`/explore/${city.country}/${city.city}`} key={city.id}>
      <div className="featured-city-card">
        <div className="image-container">
          <img src={city.data.image} alt={city.city} className="featured-city-image" />
          <div className="top-left-text">📡 {city.data.internet_speed} MB/s</div>
          <div className="top-right-text">#{city.data.rank}</div>
          <div className="bottom-right-text">
            {getWeatherEmoji(city.data.temperatureC)} {city.data.temperatureC}°C
          </div>
        </div>
        <div className="featured-city-info">
          <h3>{city.city}</h3>
          <div className="featured-city-country">
            <div className="country-with-arrow">
              <Image src="/assets/icons/ping.png" height={20} width={22} alt="location-ping-icon" />
              <h4 className="country-name">{city.country}</h4>
              {/* <div className="arrow-container">
                <span className="arrow">➔</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedCityCard
