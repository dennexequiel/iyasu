'use client';

import hero1 from '@/app/images/hero/1.jpg';
import hero2 from '@/app/images/hero/2.jpg';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
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
      <span className="sr-only">Slide {index + 1}</span>
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
  const scrollOffset = 350;
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

  return (
    <section className='relative'>
      {/* Desktop Layout */}
      <div className='hidden md:block relative h-[825px]'>
        <div className='overflow-hidden h-full' ref={desktopCarousel.emblaRef}>
          <div className='h-full flex'>
            {carouselItems.map((item) => (
              <div key={item.id} className='flex-[0_0_100%] h-full relative'>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className='object-cover'
                  priority
                  placeholder='blur'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='absolute inset-0 flex items-center'>
          <div className='container mx-auto px-4 md:px-0'>
            <div className='md:w-1/2 p-6 rounded-lg'>
              <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                Heal Simply. Live Fully.
              </h1>
              <p className='text-lg md:text-xl text-white mb-8 font-poppins'>
                Our products harness the healing power of nature, combining
                ancient wisdom with contemporary science to provide effective
                and accessible pain relief.
              </p>
              <div className='space-x-4'>
                <button onClick={scrollToShop} className='uppercase bg-white text-teal-500 font-bold border border-white hover:border-teal-500 hover:text-white hover:bg-teal-500 px-6 py-2 rounded-full transition duration-300'>
                  Shop Now
                </button>
              </div>
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
            className='embla overflow-hidden h-64'
            ref={mobileCarousel.emblaRef}
          >
            <div className='h-full flex'>
              {carouselItems.map((item) => (
                <div key={item.id} className='flex-[0_0_100%] h-full relative'>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className='object-cover w-full h-auto'
                    priority
                    placeholder='blur'
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
          <h1 className='text-3xl font-bold text-teal-500 mb-4'>
            Heal Simply. Live Fully.
          </h1>
          <p className='text-lg text-gray-600 mb-6 font-poppins'>
            Our products harness the healing power of nature, combining ancient
            wisdom with contemporary science to provide effective and accessible
            pain relief.
          </p>
          <div className='space-y-4'>
            <button onClick={scrollToShop} className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500  px-6 py-2 rounded-full transition duration-300'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
