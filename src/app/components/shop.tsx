import ShopCarousel from '@/app/components/shop-carousel';
import { PRODUCTS } from '@/app/data/products';

export default function Shop() {
  return (
    <>
      {/* Wave SVG to "subtract" the top */}
      <div className='relative py-8 md:py-12 lg:py-10 overflow-hidden w-full bg-teal-500 text-white'>
        <div className='absolute bottom-0 left-0 w-full pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1731 769'
            preserveAspectRatio='xMidYMin slice'
            className='w-full h-[60vh] sm:h-[70vh] md:h-[90vh] lg:h-auto'
          >
            <path
              fill='#FFFFFF'
              d='M0 0v757.974c24.502 7.199 47.91 10.693 71.57 10.693 53.847 0 95.821-17.976 136.448-35.364 40.458-17.303 78.643-33.68 128.153-33.68 49.51 0 87.737 16.377 128.153 33.68 40.627 17.388 82.643 35.364 136.447 35.364 53.805 0 95.821-17.976 136.448-35.364 40.458-17.303 78.643-33.68 128.153-33.68 49.51 0 87.737 16.377 128.153 33.68 40.625 17.388 82.645 35.364 136.445 35.364 53.81 0 95.82-17.976 136.45-35.364 40.46-17.303 78.64-33.68 128.15-33.68 49.51 0 87.74 16.377 128.16 33.68 40.62 17.388 82.64 35.364 136.44 35.364 23.66 0 47.07-3.494 71.57-10.693V0H0Z'
            />
          </svg>
        </div>
      </div>

      <section className='bg-teal-500 pt-12 pb-20' id='shop'>
        {/* Title and description */}
        <div className='relative z-10 px-4'>
          <div className='flex flex-col items-center text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight font-bold text-white mb-8 sm:mb-10 lg:mb-20'>
              Shop Iyasu
            </h2>
            {/* <p className='text-base text-white mb-8 lg:mb-20 font-poppins px-4 md:px-8'>
              Busy lives, simple solutions. Iyasu offers natural, effective
              relief from pain and stress. Our products are inspired by
              traditional healing methods and designed for easy use.
            </p> */}
          </div>
        </div>

        {/* Products Carousel */}
        <ShopCarousel products={PRODUCTS} />
      </section>
    </>
  )
}