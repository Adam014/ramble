import React from 'react';

const FeaturedCityCard = ({ city }) => {
  return (
    <div className="city-card">
      <h2>{city.city}, {city.country}</h2>
      {/* You can add more details about the city here */}
    </div>
  );
};

export default FeaturedCityCard;