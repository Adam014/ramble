import React from "react";

const CityCard = (city, index: number) => {
    return (
        <div className="city-card-container cursor-pointer" key={index}>
            <div className="city-info">
                <h1 className="city-name">{city.city.city}</h1>
                <h2 className="country-name">{city.city.country}</h2>
            </div>
            <div className="city-image-container">
                <div className="overlay"></div>
                <img src={city.city.data.image} className="city-image" alt="city" />
            </div>
        </div>
    );
}

export default CityCard;
