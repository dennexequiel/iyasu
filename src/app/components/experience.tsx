import { PRODUCTS } from '@/app/data/products'
import ExperienceCarousel from './experience-carousel'

export default function Experience() {
  return (
    <section className='relative py-16 overflow-hidden w-full bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto mb-12'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-teal-500 mb-6'>
            Experience the Healing of Iyasu Patches
          </h2>
          <p className='text-base sm:text-lg text-gray-600 font-poppins px-4 md:px-8'>
            Rediscover your natural balance with Iyasu. Our gentle, yet
            effective patches unlock nature&apos;s healing power to soothe
            aches and discomfort, empowering you to live life to the fullest.
          </p>
        </div>

        <ExperienceCarousel products={PRODUCTS} />
      </div>
    </section>
  )
}