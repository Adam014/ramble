// src/components/CitySlides.tsx

import React from 'react'
import PriceList from './PriceList'

const CitySlides = ({ cityData, cityCost }) => {
  const SLIDE_CONTENT = []

  const {
    name,
    population,
    temperatureC,
    temperatureC_feels_like,
    humidity,
    cost_for_expat_in_usd,
    cost_for_family_in_usd,
    cost_for_local_in_usd,
    internet_speed,
    safety_level,
    descriptionFromReview
  } = cityData?.data || {}

  if (name && population && temperatureC !== undefined && humidity !== undefined) {
    SLIDE_CONTENT.push({
      title: 'City Overview 🌍',
      content: (
        <div className="city-details-grid">
          <div className="city-detail-item">
            <span className="detail-title">🏙️ City Name:</span>
            <span className="detail-content">{name}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">👥 Population:</span>
            <span className="detail-content">{population.toLocaleString()}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🌡️ Temperature:</span>
            <span className="detail-content">
              {temperatureC}°C (Feels like {temperatureC_feels_like}°C)
            </span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">💧 Humidity:</span>
            <span className="detail-content">{humidity}%</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">💵 Cost for Expat:</span>
            <span className="detail-content">${cost_for_expat_in_usd}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">👪 Cost for Family:</span>
            <span className="detail-content">${cost_for_family_in_usd}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🏠 Cost for Local:</span>
            <span className="detail-content">${cost_for_local_in_usd}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🌐 Internet Speed:</span>
            <span className="detail-content">{internet_speed} Mbps</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🔒 Safety Level:</span>
            <span className="detail-content">{safety_level}/5</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">📝 Description:</span>
            <span className="detail-content">
              {descriptionFromReview || 'No description available.'}
            </span>
          </div>
        </div>
      ),
      filterable: false
    })
  }

  if (cityCost && cityCost.length > 0) {
    SLIDE_CONTENT.push({
      title: 'Cost to Live 💰',
      content: <PriceList cityCost={cityCost} />, // Remove static categories
      filterable: true
    })
  }

  return SLIDE_CONTENT
}

export default CitySlides
