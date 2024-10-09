import easyApplication from '@/app/images/healing-made-simple/easy-application.png';
import fastHealing from '@/app/images/healing-made-simple/fast-healing.png';
import naturalSafe from '@/app/images/healing-made-simple/natural-and-safe.png';
import logo from '@/app/images/u-logo.png';
import Image, { StaticImageData } from 'next/image';

interface FeatureCardProps {
  title: string;
  titleColor: string;
  description: string;
  icon: StaticImageData;
  iconAlt: string;
}

function FeatureCard({
  title,
  titleColor,
  description,
  icon,
  iconAlt,
}: FeatureCardProps) {
  return (
    <div className='flex flex-col items-center text-center py-2 my-8 transition-transform duration-300 hover:scale-105'>
      <div className='flex justify-center items-center w-full h-16'>
        <Image src={icon} alt={iconAlt} height={50} width={50} />
      </div>
      <h3 className={`text-xl font-semibold font-poppins ${titleColor} mt-2`}>
        {title}
      </h3>
      <p className='text-lg text-gray-600 mt-2 font-poppins px-4 md:px-8'>
        {description}
      </p>
    </div>
  );
}

export default function HealingMadeSimple() {
  const features: FeatureCardProps[] = [
    {
      title: 'Natural & Safe',
      titleColor: 'text-teal-500',
      description:
        'Each ingredient is carefully sourced and undergoes strict quality control to create products that truly heal and make your pain go away.',
      icon: naturalSafe,
      iconAlt: 'Natural & Safe',
    },
    {
      title: 'Easy Application',
      titleColor: 'text-orange-500',
      description:
        'Designed for your ease, with simple, fuss-free application.',
      icon: easyApplication,
      iconAlt: 'Easy Application',
    },
    {
      title: 'Fast Healing',
      titleColor: 'text-red-500',
      description:
        'Crafted with natural Asian medicinal ingredients, meticulously chosen to give you fast relief.',
      icon: fastHealing,
      iconAlt: 'Fast Healing',
    },
  ];

  return (
    <>
      {/* Main section with logo and introductory text */}
      <section className='relative px-4 py-16 overflow-hidden w-full'>
        <div className='w-full relative z-10'>
          <div className='flex flex-col sm:items-start md:items-center text-left md:text-center max-w-3xl mx-auto'>
            <Image
              src={logo}
              alt='Iyasu U Logo'
              width={50}
              className='mb-6 h-auto'
            />
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-teal-500 mb-6'>
              Healing Made Simple
            </h2>
            <p className='text-lg mb-8 lg:mb-20 font-poppins px-4 md:px-8'>
              Busy lives, simple solutions. Iyasu offers natural, effective
              relief from pain and stress. Our products are inspired by
              traditional healing methods and designed for easy use.
            </p>
          </div>
        </div>

        {/* SVG background for visual appeal */}
        <div className='absolute bottom-0 left-0 w-full pointer-events-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1731 769'
            preserveAspectRatio='xMidYMin slice'
            className='w-full h-[60vh] sm:h-[70vh] md:h-[90vh] lg:h-auto'
          >
            <path
              fill='#E8F5F5'
              d='M0 0v757.974c24.502 7.199 47.91 10.693 71.57 10.693 53.847 0 95.821-17.976 136.448-35.364 40.458-17.303 78.643-33.68 128.153-33.68 49.51 0 87.737 16.377 128.153 33.68 40.627 17.388 82.643 35.364 136.447 35.364 53.805 0 95.821-17.976 136.448-35.364 40.458-17.303 78.643-33.68 128.153-33.68 49.51 0 87.737 16.377 128.153 33.68 40.625 17.388 82.645 35.364 136.445 35.364 53.81 0 95.82-17.976 136.45-35.364 40.46-17.303 78.64-33.68 128.15-33.68 49.51 0 87.74 16.377 128.16 33.68 40.62 17.388 82.64 35.364 136.44 35.364 23.66 0 47.07-3.494 71.57-10.693V0H0Z'
            />
          </svg>
        </div>
      </section>

      {/* Additional section for feature cards */}
      <section className='bg-white pt-12 pb-20 lg:pb-6'>
        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    </>
  );
}
