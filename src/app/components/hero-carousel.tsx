'use client';

import hero1 from '@/app/images/hero/1.jpg';
import hero2 from '@/app/images/hero/2.jpg';
import hero3 from '@/app/images/hero/3.jpg';
import uLogoWhite from '@/app/images/u-logo-white.png';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useScrollTo } from '../hooks/useScrollTo';

const OPTIONS: EmblaOptionsType = { loop: true };
const AUTOPLAY_OPTIONS = {
  delay: 10000,
};

const carouselItems = [
  { id: 1, image: hero1, alt: 'Iyasu Background 1' },
  { id: 2, image: hero2, alt: 'Iyasu Background 2' },
  { id: 3, image: hero3, alt: 'Iyasu Background 3' },
];

type DotButtonPropType = {
  index: number;
  selected: boolean;
  onClick: () => void;
};

const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick, index } = props;

  return (
    <button
      className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
        selected ? 'bg-white' : 'bg-white bg-opacity-50'
      }`}
      type='button'
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
    >
      <span className='sr-only'>Slide {index + 1}</span>
    </button>
  );
};

const useCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay(AUTOPLAY_OPTIONS),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return { emblaRef, selectedIndex, scrollSnaps, scrollTo };
};

export default function HeroCarousel() {
  const desktopCarousel = useCarousel();
  const mobileCarousel = useCarousel();
  const scrollOffset = 100;
  const scrollTo = useScrollTo(scrollOffset);

  const scrollToShop = () => scrollTo('shop');

  const renderDots = (carousel: ReturnType<typeof useCarousel>) => (
    <div className='flex justify-center'>
      {carousel.scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          index={index}
          selected={index === carousel.selectedIndex}
          onClick={() => carousel.scrollTo(index)}
        />
      ))}
    </div>
  );

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className='relative'>
      {/* Desktop Layout */}
      <div className='hidden md:block relative h-svh'>
        <div className='overflow-hidden h-full' ref={desktopCarousel.emblaRef}>
          <div className='h-full flex'>
            {carouselItems.map((item) => (
              <div key={item.id} className='flex-[0_0_100%] h-full relative'>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className='object-cover brightness-75'
                  placeholder='blur'
                  loading='lazy'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='absolute inset-0 flex items-center'>
          <div className='container mx-auto px-4 md:px-0'>
            <div className='md:w-1/2 p-6 rounded-lg'>
              <motion.h1
                className='text-4xl md:text-5xl font-bold text-white mb-4'
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
              >
                Heal Simply. Live Fully.
              </motion.h1>
              <motion.p
                className='text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 font-poppins whitespace-normal'
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.2 }}
              >
                Made to help
                <span className='inline-flex items-baseline mx-2'>
                  <Image
                    src={uLogoWhite}
                    alt='Iyasu U Logo'
                    width={18}
                    height={18}
                  />
                </span>
                heal and stay productive every day.
              </motion.p>
              <motion.div
                className='space-x-4'
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={scrollToShop}
                  className='uppercase bg-white text-teal-500 font-bold border border-white hover:border-teal-500 hover:text-white hover:bg-teal-500 px-6 py-2 rounded-full transition duration-300'
                >
                  Shop Now
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-4 left-0 right-0 z-10'>
          {renderDots(desktopCarousel)}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden flex flex-col'>
        <div className='relative'>
          <div
            className='embla overflow-hidden h-80'
            ref={mobileCarousel.emblaRef}
          >
            <div className='h-full flex'>
              {carouselItems.map((item) => (
                <div key={item.id} className='flex-[0_0_100%] h-full relative'>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className='object-cover w-full h-auto brightness-75'
                    placeholder='blur'
                    loading='lazy'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='absolute bottom-4 left-0 right-0 z-10'>
            {renderDots(mobileCarousel)}
          </div>
        </div>
        <div className='container mx-auto px-4 py-8 bg-white'>
          <motion.h1
            className='text-3xl font-bold text-teal-500 mb-4'
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
          >
            Heal Simply. Live Fully.
          </motion.h1>
          <motion.p
            className='text-base sm:text-lg md:text-xl lg:text-2xl mb-8 font-poppins whitespace-normal text-justify'
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
          >
            Made to help you heal and stay productive every day.
          </motion.p>
          <motion.div
            className='space-y-4'
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={scrollToShop}
              className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500  px-6 py-2 rounded-full transition duration-300'
            >
              Shop Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}