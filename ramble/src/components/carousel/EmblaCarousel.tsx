// src/components/EmblaCarousel.tsx

import React, { useState, useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { MultiSelect } from 'react-multi-select-component'
import { categories } from '@utils/utils'
import { useRouter } from 'next/navigation' // Import useRouter for navigation

type SlideType = {
  title: string
  content: React.ReactNode
  filterable?: boolean
}

type PropType = {
  slides: SlideType[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const router = useRouter() // Initialize the useRouter hook

  useEffect(() => {
    // Create a URLSearchParams object
    const params = new URLSearchParams()
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','))
    } else {
      params.delete('category')
    }

    // Construct the new URL
    const newUrl = `${window.location.pathname}?${params.toString()}`

    // Replace the current URL with the new one
    router.replace(newUrl, { shallow: true })
  }, [selectedCategories, router])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__content">
                <div className="embla__slide__header">
                  <h2 className="pb-4">{slide.title}</h2>
                  {slide.filterable && (
                    <MultiSelect
                      options={categories}
                      value={selectedCategories.map((value) => ({ label: value, value }))}
                      onChange={(values) => setSelectedCategories(values.map((v) => v.value))}
                      labelledBy="Select Categories"
                      className="multi-select"
                      overrideStrings={{ selectSomeItems: 'Select categories...' }}
                    />
                  )}
                </div>
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons__left">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="embla__button embla__button--prev"
          />
        </div>
        <div className="embla__buttons__right">
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="embla__button embla__button--next"
          />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
