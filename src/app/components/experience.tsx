import { PRODUCTS } from '@/app/data/products'
import ExperienceCarousel from './experience-carousel'

export default function Experience() {
  return (
    <section className='relative py-16 overflow-hidden w-full bg-white' id='experience'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto px-6 sm:px-8 lg:px-16'>
          <h1 className='text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight font-bold text-teal-500 mb-8 sm:mb-10 lg:mb-12'>
            Experience Relief With Iyasu
          </h1>
          {/* <p className='text-base sm:text-lg text-gray-600 font-poppins px-4 md:px-8'>
            Rediscover your natural balance with Iyasu. Our gentle, yet
            effective patches unlock nature&apos;s healing power to soothe
            aches and discomfort, empowering you to live life to the fullest.
          </p> */}
        </div>

        <ExperienceCarousel products={PRODUCTS} />
      </div>
    </section>
  )
}