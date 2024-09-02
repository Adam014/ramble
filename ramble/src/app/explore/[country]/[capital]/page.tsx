// src/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { useDecodedParams, fetchCityData } from '@utils/utils'
import Tag from '@components/cards/Tag'
import tagData from '../../../../../public/tags-single.json'
import Loader from '@components/Loader'
import '../../../../styles/embla.css'
import EmblaCarousel from '@components/carousel/EmblaCarousel'
import { Toaster } from 'react-hot-toast'
import { OPTIONS, SLIDE_CONTENT as STATIC_SLIDE_CONTENT } from '@utils/contants/slides'
import CitySlides from '@components/cards/CitySlides'

const Page = () => {
  const { country = '', city = '' } = useDecodedParams()
  const [cityData, setCityData] = useState(null)
  const [cityCost, setCityCost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (country && city) {
      const getCityData = async () => {
        const data = await fetchCityData(country, city)
        setCityData(data)
        setCityCost(data.prices.prices)
        setLoading(false)
      }

      getCityData()
    }
  }, [country, city])

  if (loading || !cityData) {
    return <Loader />
  }

  const SLIDE_CONTENT = CitySlides({ cityData, cityCost })

  return (
    <div className="city-single-container">
      <div className="city-single-title-container">
        <h1 className="city-single-title">
          {country}, {city}
        </h1>
        <div className="flex tags tags-single">
          {tagData.map((tag, index) => (
            <Tag key={index} icon={tag.icon} label={tag.label} />
          ))}
        </div>
      </div>
      <EmblaCarousel slides={[...SLIDE_CONTENT, ...STATIC_SLIDE_CONTENT]} options={OPTIONS} />
      <Toaster position="bottom-center" />
    </div>
  )
}

export default Page
