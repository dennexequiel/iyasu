import { TESTIMONIALS } from '@/app/data/testimonials'
import TestimonialCarousel from './testimonial-carousel'

export default function Testimonials() {
  return (
    <section className='relative pb-16 overflow-hidden w-full' id='testimonials'>
      <div className='w-full relative pt-14 pb-0 lg:pb-14 z-10 bg-teal-500 mb-10'>
        {/* Text Section */}
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto px-6 sm:px-8 lg:px-16'>
          <h2 className='text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight font-bold text-white mb-8 sm:mb-10 lg:mb-12 hover:scale-105 transition-transform duration-300'>
            Follow Iyasu. Let&apos;s Feel Better Together!
          </h2>
        </div>

        {/* Carousel Container */}
        <TestimonialCarousel testimonials={TESTIMONIALS}/>
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
  )
}