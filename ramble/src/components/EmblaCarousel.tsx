import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

type SlideType = {
  title: string
  content: React.ReactNode
}

type PropType = {
  slides: SlideType[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__content">
                <h2 className='pb-4'>{slide.title}</h2>
                <div>{slide.content}</div>
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