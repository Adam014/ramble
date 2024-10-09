'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BackgroundVideo from '@components/titlepage_sections/BackgroundVideo'
import TagsSection from '@components/titlepage_sections/TagsSection'
import FeaturedDestinations from '@components/titlepage_sections/FeaturedDestinations'
import { fetchCitiesAndCountries, handleRouting, fetchAndSelectFeaturedCities } from '@utils/utils'

export default function Home() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [placeholder, setPlaceholder] = useState('E.g., Czechia, Prague')
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cityList, setCityList] = useState([])
  const [countryList, setCountryList] = useState([])
  const [featuredCities, setFeaturedCities] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await fetchAndSelectFeaturedCities()
      if (cities) {
        setFeaturedCities(cities)
      }
    }

    // Fetch cities initially
    fetchCities()

    // Set an interval to fetch cities every 15 minutes (900000 milliseconds)
    const intervalId = setInterval(fetchCities, 900000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  // Fetch cities and countries from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { cities, countries } = await fetchCitiesAndCountries()
      setCityList(cities)
      setCountryList(countries)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Function to update placeholder every 15 seconds
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * cityList.length)
      const randomCity = cityList[randomIndex]
      const randomCountry = countryList[randomIndex]

      setShowPlaceholder(false)
      setTimeout(() => {
        setPlaceholder(`E.g., ${randomCountry}, ${randomCity}`)
        setShowPlaceholder(true)
      }, 300) // Delay placeholder change to sync with CSS animation
    }, 10000) // Change placeholder every 15 seconds

    return () => {
      clearInterval(intervalId) // Cleanup function to clear interval when component unmounts
    }
  }, [cityList, countryList])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = () => {
    const input = searchValue.trim()

    if (!input) return

    // Handle routing based on input match (direct or fuzzy)
    handleRouting(input, cityList, countryList, router)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <BackgroundVideo />
      <div className={`title-container ${isScrolled ? 'black-bg' : ''}`}>
        <section className="w-full flex flex-col items-center p-10 pt-10 relative z-50">
          <h1 className="text-5xl font-bold text-center">Explore🏛️. Dream💭. Ramble🚶.</h1>
          <div className="flex justify-center mt-20 w-full">
            <div className="input-container relative w-full max-w-3xl">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="input-title w-full p-8 text-lg text-black border-none shadow-lg transition-all"
              />
              <button
                onClick={handleSubmit}
                className="title-button absolute right-4 transform -translate-y-1/2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full py-2 px-4 transition-all"
              >
                Go
              </button>
              <p className='pt-2'>🚀 Find the finest of the finest in the world. 🚂 Be prepared on your next journey.</p>
            </div>
          </div>
          <style jsx>{`
            input::placeholder {
              opacity: ${showPlaceholder ? 1 : 0};
              transition: opacity 0.3s ease-in-out;
            }
          `}</style>
        </section>
      </div>
      <TagsSection />
      <FeaturedDestinations />
    </>
  )
}
