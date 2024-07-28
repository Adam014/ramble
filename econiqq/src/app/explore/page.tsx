'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCities } from '@hooks/useCities'
import tagData from '../../../public/tags.json'
import Search from '@components/Search'
import Tag from '@components/Tag'
import CityCard from '@components/CityCard'
import Loader from '@components/Loader'
import ReactPaginate from 'react-paginate'

const Map = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(10)
  const [isLoading, setIsLoading] = useState(true)
  const { featuredCities, otherCities, isLoading: citiesLoading } = useCities(currentPage + 1)

  useEffect(() => {
    const updatePageRange = () => {
      if (window.innerWidth <= 767) {
        setPageRangeDisplayed(3)
      } else {
        setPageRangeDisplayed(10)
      }
    }

    updatePageRange()
    window.addEventListener('resize', updatePageRange)

    return () => window.removeEventListener('resize', updatePageRange)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!citiesLoading) {
      setIsLoading(false)
    }
  }, [citiesLoading])

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  return (
    <div className="ml-10 mr-5">
      <div>
        <h2 className="text-4xl mt-10 mb-10">
          Explore <span className="custom_font custom_color">Globally</span>
        </h2>
      </div>

      <Search />

      <div className="flex tags">
        {isLoading ? (
          <></>
        ) : (
          tagData.map((tag, index) => <Tag key={index} icon={tag.icon} label={tag.label} />)
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="featured-items">
            <h1 className="text-5xl mt-10">Featured places</h1>
            <div className="flex featured-cities-container">
              {featuredCities.map((city, index) => (
                <Link href={`/explore/${city.country}/${city.city}`} key={index}>
                  <CityCard city={city} />
                </Link>
              ))}
            </div>
          </div>
          <div className="other-items mt-32 mb-32">
            <h1 className="text-5xl">Where about?</h1>
            <div className="other-cities-container grid grid-cols-5">
              {otherCities.map((city, index) => (
                <Link href={`/explore/${city.country}/${city.city}`} key={index}>
                  <CityCard city={city} />
                </Link>
              ))}
            </div>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            previousLabel="< previous"
            pageRangeDisplayed={pageRangeDisplayed}
            pageCount={55}
            containerClassName="pagination-container"
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            onPageChange={handlePageClick}
            initialPage={currentPage}
            renderOnZeroPageCount={null}
          />
        </>
      )}
    </div>
  )
}

export default Map
