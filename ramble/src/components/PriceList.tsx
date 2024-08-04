import React from 'react';
import { getEmojiForCategory } from "@utils/utils"

interface PriceItem {
  good_id: string;
  category_name: string;
  item_name: string;
  usd: {
    min: number;
    avg: number;
    max: number;
  };
}

interface PriceListProps {
  cityCost: PriceItem[];
}

const PriceList: React.FC<PriceListProps> = ({ cityCost }) => {
  return (
    <>
      {cityCost.map((price) => (
        <div key={price.good_id} className="price-detail-item">
          <div className="price-item-name">
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
    </>
  );
};

export default PriceList;
