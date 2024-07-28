'use client'

import React, { useState, useEffect } from 'react'
import { useDecodedParams, fetchCityData } from '@utils/utils'
import Tag from '@components/Tag'
import tagData from '../../../../../public/tags-single.json'
import Loader from '@components/Loader'
import '../../../../styles/embla.css'
import EmblaCarousel from '@components/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_CONTENT = [
  'Welcome to the first slide!',
  "Here's some interesting info for the second slide.",
  "Don't miss out on this for the third slide.",
  'Check this out on the fourth slide.',
  'Finally, the fifth slide has this to offer.'
]

const Page = () => {
  const { country = '', city = '' } = useDecodedParams()
  const [cityData, setCityData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (country && city) {
      const getCityData = async () => {
        const data = await fetchCityData(country, city)
        setCityData(data)
        setLoading(false)
      }

      getCityData()
    }
  }, [country, city])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="city-single-container">
      <div className="city-single-title-container">
        <h1 className="city-single-title">
          {country}, {city}
        </h1>
        <div className="flex tags">
          {loading ? (
            <></>
          ) : (
            tagData.map((tag, index) => <Tag key={index} icon={tag.icon} label={tag.label} />)
          )}
        </div>
      </div>
      <EmblaCarousel slides={SLIDE_CONTENT} options={OPTIONS} />
    </div>
  )
}

export default Page
