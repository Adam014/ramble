import React from 'react'
import { getWeatherEmoji } from '@utils/utils'

const CityCard = (city, index: number) => {
  const singleCity = city.city
  const imageSrc = singleCity?.data?.image
  const hasImage = Boolean(imageSrc)
  const temperatureC = singleCity?.data?.temperatureC

  return (
    <div className="city-card-container cursor-pointer" key={index}>
      <div className="city-info">
        <h1 className="city-name">{singleCity.city}</h1>
        <h2 className="country-name">{singleCity.country}</h2>
      </div>
      <div className={`city-image-container ${!hasImage ? 'default-background' : ''}`}>
        <div className="overlay"></div>
        {hasImage && (
          <div className="image-container">
            <img
              src={imageSrc}
              className="city-image rounded-xl"
              alt={`${singleCity.city} image`}
            />
            <div className="top-left-text">📡 {singleCity.data.internet_speed} MB/s</div>
            <div className="top-right-text">#{singleCity.data.rank}</div>
            <div className="bottom-right-text">
              {getWeatherEmoji(temperatureC)} {temperatureC}°C
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CityCard
