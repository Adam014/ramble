"use client";

import React, { useState, useEffect } from "react";
import { useDecodedParams, fetchCityData } from "@utils/utils";
import Tag from "@components/Tag";
import tagData from "../../../../../public/tags-single.json";
import Loader from "@components/Loader";
import "../../../../styles/embla.css";
import EmblaCarousel from "@components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Toaster } from "react-hot-toast";

const OPTIONS: EmblaOptionsType = { loop: true };

// TODO: Need to refactor this holy fuck

const Page = () => {
  const { country = "", city = "" } = useDecodedParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (country && city) {
      const getCityData = async () => {
        const data = await fetchCityData(country, city);
        setCityData(data);
        setLoading(false);
      };

      getCityData();
    }
  }, [country, city]);

  if (loading || !cityData) {
    return <Loader />;
  }

  const prices = cityData?.prices?.prices;

  const getEmojiForCategory = (categoryName: string) => {
    const emojiMap: { [key: string]: string } = {
      "Buy Apartment": "🏠",
      "Childcare": "🧒",
      "Clothing And Shoes": "👗",
      "Markets": "🛒",
      "Rent Per Month": "🏢",
      "Restaurants": "🍽️",
      "Salaries And Financing": "💰",
      "Sports And Leisure": "🎾",
      "Transportation": "🚗",
      "Utilities Per Month": "⚡",
    };

    return emojiMap[categoryName] || "❓"; // Default emoji if none found
  };

  const renderPrices = () => {
    return prices?.map((price) => (
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
    ));
  };

  // Initialize an empty array to hold slide content
  const SLIDE_CONTENT = [];

  // Safe destructuring with optional chaining
  const {
    name,
    population,
    temperatureC,
    temperatureC_feels_like,
    humidity,
    cost_for_expat_in_usd,
    cost_for_family_in_usd,
    cost_for_local_in_usd,
    internet_speed,
    safety_level,
    descriptionFromReview,
  } = cityData?.data || {}; 

  // Add City Overview slide only if essential data is available
  if (name && population && temperatureC !== undefined && humidity !== undefined) {

    SLIDE_CONTENT.push({
      title: "City Overview 🌍",
      content: (
        <div className="city-details-grid">
          <div className="city-detail-item">
            <span className="detail-title">🏙️ City Name:</span>
            <span className="detail-content">{name}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">👥 Population:</span>
            <span className="detail-content">{population.toLocaleString()}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🌡️ Temperature:</span>
            <span className="detail-content">
              {temperatureC}°C (Feels like {temperatureC_feels_like}°C)
            </span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">💧 Humidity:</span>
            <span className="detail-content">{humidity}%</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">💵 Cost for Expat:</span>
            <span className="detail-content">${cost_for_expat_in_usd}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">👪 Cost for Family:</span>
            <span className="detail-content">${cost_for_family_in_usd}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🏠 Cost for Local:</span>
            <span className="detail-content">${cost_for_local_in_usd}</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🌐 Internet Speed:</span>
            <span className="detail-content">{internet_speed} Mbps</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">🔒 Safety Level:</span>
            <span className="detail-content">{safety_level}/5</span>
          </div>
          <div className="city-detail-item">
            <span className="detail-title">📝 Description:</span>
            <span className="detail-content">
              {descriptionFromReview || "No description available."}
            </span>
          </div>
        </div>
      ),
    });
  }

  // Add Cost to Live slide only if prices are available
  if (prices && prices.length > 0) {
    SLIDE_CONTENT.push({
      title: "Cost to Live 💰",
      content: (
        <div className="price-details-grid">
          {renderPrices()}
          <div className="scroll-indicator">⬇️</div>
        </div>
      ),
    });
  }

  // You can add additional checks for other slides if necessary
  SLIDE_CONTENT.push(
    {
      title: "Upcoming Events 📅",
      content: "Check out these exciting events happening soon in the city!",
    },
    {
      title: "Cultural Highlights 🎭",
      content: "Discover the cultural gems and attractions this city has to offer.",
    },
    {
      title: "Travel Tips ✈️",
      content: "Here are some travel tips to help you enjoy your stay in the city.",
    }
  );

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
      <EmblaCarousel slides={SLIDE_CONTENT} options={OPTIONS} />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Page;
