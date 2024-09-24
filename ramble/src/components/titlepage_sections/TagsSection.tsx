import React, { useState, useEffect } from 'react'
import StatsImage from '@components/cards/StatsImage'
import statsData from '../../../public/stats.json'
import { fetchCountryCityCounts } from '@utils/utils'

const TagsSection = () => {
  const [counts, setCounts] = useState({ countryCount: 0, cityCount: 0 })
  const [startCount, setStartCount] = useState(false)

  useEffect(() => {
    const getCounts = async () => {
      const { countryCount, cityCount } = await fetchCountryCityCounts()
      setCounts({ countryCount, cityCount })
      setStartCount(true)
    }
    getCounts()
  }, [])

  return (
    <section className="pb-20 pt-64">
      <h1 className="tags-h1 text-center">What you get with us?</h1>
      <div className="sm:block md:flex flex-wrap justify-center grid">
        <StatsImage
          icon="/assets/icons/globe_pink.png"
          count={counts.countryCount}
          count_start={0}
          label="countries"
          startCount={startCount}
        />
        {statsData.map((stat, index) => (
          <StatsImage
            key={index}
            icon={stat.icon}
            count={stat.count}
            count_start={stat.count_start}
            label={stat.label}
            startCount={startCount}
          />
        ))}
      </div>
    </section>
  )
}

export default TagsSection
