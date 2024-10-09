'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';

const StarRating = ({ rating }: { rating: number }) => (
  <div className='flex justify-center mb-4'>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {rating >= star ? (
          <Star className='w-5 h-5 text-orange-500 fill-current' />
        ) : rating > star - 1 ? (
          <StarHalf className='w-5 h-5 text-orange-500 fill-current' />
        ) : (
          <Star className='w-5 h-5 text-gray-300' />
        )}
      </span>
    ))}
  </div>
);

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className='relative pb-16 overflow-hidden w-full'>
      <div className='w-full relative pt-14 pb-0 lg:pb-14 z-10 bg-teal-500 mb-10'>
        {/* Text Section */}
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto px-6 sm:px-8 lg:px-16'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-10 lg:mb-12'>
            Follow Iyasu. Let&apos;s Feel Better Together!
          </h2>
        </div>

        {/* Carousel Container */}
        <div className='relative max-w-full mx-auto cursor-pointer'>
          <div className='overflow-hidden' ref={emblaRef}>
            {/* Card Wrapping */}
            <div className='flex -mx-2 lg:-mx-4'>
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className='flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] px-2 lg:px-4'
                >
                  {/* Card */}
                  <div className='bg-white p-8 h-auto min-w-[300px] max-w-full sm:max-w-[90%] lg:max-w-[500px] rounded-[32px] shadow-md mx-auto'>
                    <StarRating rating={testimonial.rating} />
                    <blockquote className='text-lg mb-6 min-h-32 lg:min-h-24 xl:min-h-28 font-poppins'>
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
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === selectedIndex
                    ? 'bg-white'
                    : 'bg-white bg-opacity-50'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SVG background for visual appeal */}
      <div className='absolute bottom-0 left-0 w-full pointer-events-none bg-teal-50'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1731 769'
          preserveAspectRatio='xMidYMin slice'
          className='w-full h-[60vh] sm:h-[70vh] md:h-[90vh] lg:h-auto'
        >
          <path
            fill='#1B9C9E'
            d='M0 0v757.974c24.502 7.199 47.91 10.693 71.57 10.693 53.847 0 95.821-17.976 136.448-35.364 40.458-17.303 78.643-33.68 128.153-33.68 49.51 0 87.737 16.377 128.153 33.68 40.627 17.388 82.643 35.364 136.447 35.364 53.805 0 95.821-17.976 136.448-35.364 40.458-17.303 78.643-33.68 128.153-33.68 49.51 0 87.737 16.377 128.153 33.68 40.625 17.388 82.645 35.364 136.445 35.364 53.81 0 95.82-17.976 136.45-35.364 40.46-17.303 78.64-33.68 128.15-33.68 49.51 0 87.74 16.377 128.16 33.68 40.62 17.388 82.64 35.364 136.44 35.364 23.66 0 47.07-3.494 71.57-10.693V0H0Z'
          />
        </svg>
      </div>
    </section>
  );
}
