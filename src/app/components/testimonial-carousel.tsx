'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image, { StaticImageData } from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type Testimonial = {
  id: number
  name: string
  quote: string
  rating: number
  image: StaticImageData
}

type Props = {
  testimonials: Testimonial[]
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className='flex justify-center mb-4'>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {rating >= star ? (
          <svg className='w-5 h-5 text-orange-500 fill-current' viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ) : rating > star - 1 ? (
          <svg className='w-5 h-5 text-orange-500 fill-current' viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ) : (
          <svg className='w-5 h-5 text-gray-300' viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )}
      </span>
    ))}
  </div>
)

export default function TestimonialCarousel({ testimonials }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  return (
    <div className='relative max-w-full mx-auto cursor-pointer'>
      <div className='overflow-hidden' ref={emblaRef}>
        {/* Card Wrapping */}
        <div className='flex -mx-2 lg:-mx-4'>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className='flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] px-2 lg:px-4'
            >
              {/* Card */}
              <div className='bg-white p-8 h-auto min-w-[300px] max-w-full sm:max-w-[90%] lg:max-w-[500px] rounded-[32px] shadow-md mx-auto'>
                <StarRating rating={testimonial.rating} />
                <blockquote className='text-lg mb-6 min-h-56 md:min-h-72 lg:min-h-80 xl:min-h-48 font-poppins'>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className='flex flex-col items-center'>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className='rounded-full mb-4 object-cover bg-teal-50'
                  />
                  <div className='text-center'>
                    <p className='font-poppins text-base'>
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className='flex justify-center mt-8 lg:mt-12'>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === selectedIndex
                ? 'bg-white'
                : 'bg-white bg-opacity-50'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <span className='sr-only'>Go to testimonial {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}