'use client'

import { Product } from '@/app/data/products'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ShopPopup } from './shop-popup'

function ProductCard({
  product,
  onShopNow,
}: {
  product: Product
  onShopNow: (product: Product) => void
}) {
  return (
    <div className='bg-white p-6 sm:p-8 h-full rounded-[32px] sm:rounded-[56px] drop-shadow-lg mx-auto flex flex-col w-full md:w-[688px]'>
      <div className='relative w-full h-48 sm:h-64 md:h-80 mb-6'>
        <Image
          src={product.experienceImageSrc}
          alt={product.title}
          className='rounded-[24px] sm:rounded-[32px] object-cover'
          placeholder='blur'
          fill
        />
      </div>
      <div className='flex flex-col flex-grow'>
        <h3 className='text-2xl sm:text-3xl font-bold text-teal-500 mb-4'>
          {product.title}
        </h3>
        <p className='text-sm sm:text-base text-gray-600 mb-6 flex-grow font-poppins'>
          {product.experienceDescription}
        </p>
        <button
          onClick={() => onShopNow(product)}
          className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500 px-6 py-2 rounded-full transition duration-300'
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default function ExperienceCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const handleShopNow = (product: Product) => {
    setSelectedProduct(product)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <div className='relative cursor-pointer'>
        <div className='overflow-visible' ref={emblaRef}>
          <div className='flex -mx-4'>
            {products.map((product) => (
              <div
                key={product.title}
                className='flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4'
              >
                <ProductCard product={product} onShopNow={handleShopNow} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-8'>
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === selectedIndex
                ? 'bg-neutral-800'
                : 'bg-neutral-800 bg-opacity-50'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to product ${index + 1}`}
          >
            <span className='sr-only'>Go to product {index + 1}</span>
          </button>
        ))}
      </div>

      {selectedProduct && (
        <ShopPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          product={selectedProduct}
        />
      )}
    </>
  )
}