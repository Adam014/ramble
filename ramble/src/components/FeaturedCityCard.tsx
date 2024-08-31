import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

const FeaturedCityCard = ({ city }) => {
  return (
    <Link href={`/explore/${city.country}/${city.city}`} key={city.id}>
      <div className="featured-city-card">
        <img src={city.data.image} alt={city.city} className="city-image" />
        <div className="featured-city-info">
          <h3>{city.city}</h3>
          <div className='featured-city-country'>
            <div className="country-with-arrow">
              <Image 
                src="/assets/icons/ping.png"
                height={20}
                width={22}
                alt='location-ping-icon'
              />
              <h4 className='country-name'>{city.country}</h4>
              {/* <div className="arrow-container">
                <span className="arrow">➔</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCityCard;