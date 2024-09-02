// src/components/PriceList.tsx

import React, { useMemo } from 'react'
import { getEmojiForCategory } from '@utils/utils'
import { useSearchParams } from 'next/navigation'

interface PriceItem {
  good_id: string
  category_name: string
  item_name: string
  usd: {
    min: number
    avg: number
    max: number
  }
}

interface PriceListProps {
  cityCost: PriceItem[]
}

const PriceList: React.FC<PriceListProps> = ({ cityCost }) => {
  const searchParams = useSearchParams()
  const selectedCategories = useMemo(() => {
    const categoryParam = searchParams.get('category')
    return categoryParam ? categoryParam.split(',') : []
  }, [searchParams])

  const filteredCityCost = cityCost.filter(
    (price) => selectedCategories.length === 0 || selectedCategories.includes(price.category_name)
  )

  return (
    <div className="price-details-grid">
      {filteredCityCost.map((price) => (
        <div key={price.good_id} className="price-detail-item">
          <div className="price-item-name" data-emoji={getEmojiForCategory(price.category_name)}>
            {getEmojiForCategory(price.category_name)}
            {price.item_name}
          </div>
          <div className="price-values">
            <span className="price-value">Min: ${price.usd?.min}</span>
            <span className="price-value-bold">Avg: ${price.usd?.avg}</span>
            <span className="price-value">Max: ${price.usd?.max}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PriceList
