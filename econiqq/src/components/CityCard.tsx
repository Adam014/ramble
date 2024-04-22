import React from "react";

const CityCard = (city, index: number) => {
    console.log(city)
    const singleCity = city.city
    return (
        <div className="city-card-container cursor-pointer" key={index}>
            <div className="city-info">
                <h1 className="city-name">{singleCity.city}</h1>
                <h2 className="country-name">{singleCity.country}</h2>
            </div>
            <div className="city-image-container">
                <div className="overlay"></div>
                <img src={singleCity.data.image} className="city-image rounded-xl" alt="city" />
            </div>
        </div>
    );
}

export default CityCard;
