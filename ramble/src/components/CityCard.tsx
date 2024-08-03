import React from 'react';

const CityCard = (city, index: number) => {
  const singleCity = city.city;
  const imageSrc = singleCity?.data?.image;
  const hasImage = Boolean(imageSrc);

  return (
    <div className="city-card-container cursor-pointer" key={index}>
      <div className="city-info">
        <h1 className="city-name">{singleCity.city}</h1>
        <h2 className="country-name">{singleCity.country}</h2>
      </div>
      <div
        className={`city-image-container ${!hasImage ? 'default-background' : ''}`}
      >
        <div className="overlay"></div>
        {hasImage && (
          <img
            src={imageSrc}
            className="city-image rounded-xl"
            alt={`${singleCity.city} image`}
          />
        )}
      </div>
    </div>
  );
};

export default CityCard;