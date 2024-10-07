'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { ShopPopup } from './shop-popup';

function ProductCard({
  product,
  onShopNow,
}: {
  product: Product;
  onShopNow: () => void;
}) {
  return (
    <div
      className='bg-white rounded-[58px] overflow-hidden p-6 flex flex-col h-full z-10'
      id='shop'
    >
      <div className='rounded-[58px] aspect-square relative overflow-hidden mb-4'>
        <Image
          src={product.imageSrc}
          alt={product.title}
          className='object-cover w-full h-auto'
          placeholder='blur'
        />
      </div>
      <h3 className='text-xl font-bold mb-2'>{product.title}</h3>
      <p className='text-gray-600 text-sm mb-4 flex-grow'>
        {product.description}
      </p>
      <div className='flex items-center justify-start mb-4'>
        <span className='text-gray-400 line-through'>
          PHP {product.originalPrice.toFixed(2)}
        </span>
        <span className='text-2xl font-bold ml-2'>
          PHP {product.discountedPrice.toFixed(2)}
        </span>
      </div>
      <button
        onClick={onShopNow}
        className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500 px-6 py-2 rounded-full transition duration-300'
      >
        Shop Now
      </button>
    </div>
  );
}

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

function DotButton({ selected, onClick }: DotButtonProps) {
  return (
    <button
      className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
        selected ? 'bg-white' : 'bg-white bg-opacity-50'
      }`}
      type='button'
      onClick={onClick}
      aria-label={selected ? 'Current slide' : 'Go to slide'}
    />
  );
}

export default function Shop() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState(1);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const updateSlidesToScroll = useCallback(() => {
    if (window.innerWidth >= 1280) {
      setSlidesToScroll(4);
    } else if (window.innerWidth >= 1024) {
      setSlidesToScroll(3);
    } else if (window.innerWidth >= 640) {
      setSlidesToScroll(2);
    } else {
      setSlidesToScroll(1);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // Update Embla carousel with slidesToScroll
    emblaApi.reInit({ slidesToScroll });

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Initialize the slidesToScroll based on window size
    updateSlidesToScroll();
    window.addEventListener('resize', updateSlidesToScroll);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      window.removeEventListener('resize', updateSlidesToScroll);
    };
  }, [emblaApi, onSelect, updateSlidesToScroll, slidesToScroll]);

  const handleShopNow = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const totalSlides = Math.ceil(PRODUCTS.length / slidesToScroll);

  return (
    <>
      {/* Wave SVG to "subtract" the top */}
      <div className='relative py-8 lg:py-16 overflow-hidden w-full bg-teal-500 text-white'>
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

      <section className='bg-teal-500 pt-12 pb-20'>
        {/* Title and description */}
        <div className='relative z-10 px-4'>
          <div className='flex flex-col items-center text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6'>
              Shop Iyasu
            </h2>
            <p className='text-lg text-white mb-8 lg:mb-20 font-poppins'>
              Busy lives, simple solutions. Iyasu offers natural, effective
              relief from pain and stress. Our products are inspired by
              traditional healing methods and designed for easy use.
            </p>
          </div>
        </div>

        {/* Products Carousel */}
        <div className='container mx-auto px-4 cursor-pointer'>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {PRODUCTS.map((product, index) => (
                <div
                  key={index}
                  className='flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_25%] pl-4 first:pl-0 relative transition-transform duration-300 ease-in-out'
                >
                  <ProductCard
                    product={product}
                    onShopNow={() => handleShopNow(product)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          {totalSlides > 1 && (
            <div className='flex justify-center mt-6'>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ShopPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          product={selectedProduct}
        />
      )}
    </>
  );
}
