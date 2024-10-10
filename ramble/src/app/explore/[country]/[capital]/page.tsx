'use client';

import React, { useState, useEffect } from 'react';
import { useDecodedParams, fetchCityData, getRandomProfile } from '@utils/utils';
import Tag from '@components/cards/Tag';
import tagData from '../../../../../public/tags-single.json';
import Loader from '@components/Loader';
import { MultiSelect } from 'react-multi-select-component';
import { categories } from '@utils/utils';

const Page = () => {
  const { country = '', city = '' } = useDecodedParams();
  const [cityData, setCityData] = useState(null);
  const [cityCost, setCityCost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProfile] = useState(getRandomProfile); // Generate random profile only once

  useEffect(() => {
    if (country && city) {
      const getCityData = async () => {
        const data = await fetchCityData(country, city);
        setCityData(data);
        setCityCost(data?.prices?.prices);
        setLoading(false);
      };

      getCityData();
    }
  }, [country, city]);

  if (loading) {
    return <Loader />;
  }

  if (!cityData) {
    return <p>No data available for this city.</p>;
  }

  const { data } = cityData;

  // Filter the cityCost based on selected categories
  const filteredCityCost = cityCost
    ? cityCost.filter(item => selectedCategories.length === 0 || selectedCategories.includes(item.category_name))
    : [];

  return (
    <div className="city-single-container">
      <div className="city-single-title-container">
        <h1 className="city-single-title">
          {country}, {city}
        </h1>
        <div className="flex justify-center">
          <div className="flex tags tags-single">
            {tagData.map((tag, index) => (
              <Tag key={index} icon={tag.icon} label={tag.label} />
            ))}
          </div>
        </div>
      </div>

      <div className="layout">
        {/* General Information */}
        {data && (
          <div className="card-detail card-1">
            <div className="card-section">
              <h2 className="section-title underline_purple">General Information</h2>
              <p><strong>City:</strong> {data.name} ({data.name_chinese})</p>
              <p><strong>Country:</strong> {data.country} ({data.country_chinese})</p>
              <p><strong>Population:</strong> {data.population} 🧑</p>
              {data.latitude && data.longitude && (
                <p>
                  <strong>Latitude:</strong> {data.latitude} | <strong>Longitude:</strong> {data.longitude}
                </p>
              )}
              {data.region && <p><strong>Region:</strong> {data.region}</p>}
            </div>

            {/* Weather & Safety */}
            {data.temperatureC && (
              <div className="card-section">
                <h2 className="section-title underline_purple">Weather & Safety</h2>
                <p><strong>Temperature:</strong> {data.temperatureC}°C (Feels like {data.temperatureC_feels_like}°C)</p>
                <p><strong>Weather:</strong> {data.weather_emoji}</p>
                <p><strong>Humidity:</strong> {data.humidity}%</p>
                <p><strong>Safety Level:</strong> {data.safety_level}/5</p>
              </div>
            )}

            {/* Internet & Connectivity */}
            {data.internet_speed && (
              <div className="card-section">
                <h2 className="section-title underline_purple">Internet & Connectivity</h2>
                <p><strong>Internet Speed:</strong> {data.internet_speed} Mbps</p>
                <p><strong>Internet Score:</strong> {data.internet_score}/5</p>
              </div>
            )}

            {/* Costs */}
            {data.cost_for_expat_in_usd && (
              <div className="card-section">
                <h2 className="section-title underline_purple">Costs</h2>
                <p><strong>Cost for Expat:</strong> ${data.cost_for_expat_in_usd}/month</p>
                <p><strong>Cost for Family:</strong> ${data.cost_for_family_in_usd}/month</p>
                <p><strong>Cost for Local:</strong> ${data.cost_for_local_in_usd}/month</p>
                <p><strong>Cost for Nomad:</strong> ${data.cost_for_nomad_in_usd}/month</p>
                <p><strong>Cost Score:</strong> {data.cost_score}/5</p>
              </div>
            )}

            {/* Review */}
            {data.descriptionFromReview && (
              <div className="card-section">
                <h2 className="section-title underline_purple">Review</h2>
                <p>{data.descriptionFromReview}</p>
                <div className="profile-container">
                  <img src={selectedProfile.image} alt="Reviewer Profile" className="profile-picture" />
                  <span className="profile-name">{selectedProfile.name}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="card-detail card-2">Info</div>
        <div className="card-detail card-4">Events</div>

        {/* Cost of Living */}
        {cityCost && cityCost.length > 0 && (
          <div className="card-detail card-3">
            <h1 className="section-title">Cost of Living</h1>
            <MultiSelect
              options={categories}
              value={selectedCategories.map((value) => ({ label: value, value }))}
              onChange={(values) => setSelectedCategories(values.map((v) => v.value))}
              labelledBy="Select Categories"
              className="multi-select"
              overrideStrings={{ selectSomeItems: 'Select categories...' }}
            />
            {filteredCityCost.map((item, index) => (
              <div key={index} className="cost-item">
                <span className="underline_purple text-xl"><b>{item.item_name}</b></span>
                <span>Min: ${item?.usd?.min} - Avg: ${item?.usd?.avg} - Max: ${item?.usd?.max}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
