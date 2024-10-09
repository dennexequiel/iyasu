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
  onShopNow: () => void
}) {
  return (
    <div
      className='bg-white rounded-[58px] overflow-hidden p-6 flex flex-col h-full z-10'
      id='shop'
    >
      <div className='rounded-[46px] aspect-square relative overflow-hidden mb-4'>
        <Image
          src={product.imageSrc}
          alt={product.title}
          className='object-cover w-full h-auto'
          placeholder='blur'
        />
      </div>
      <h3 className='text-xl font-bold my-4 font-poppins'>{product.title}</h3>
      <p className='text-gray-600 text-sm mb-4 flex-grow font-poppins'>
        {product.description}
      </p>
      <div className='flex items-center justify-start mb-4'>
        <span className='text-gray-400 line-through font-poppins'>
          PHP {product.originalPrice.toFixed(2)}
        </span>
        <span className='text-xl font-bold ml-2 font-poppins'>
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
  )
}

type DotButtonProps = {
  index: number
  selected: boolean
  onClick: () => void
}

function DotButton({ selected, onClick, index }: DotButtonProps) {
  return (
    <button
      className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
        selected ? 'bg-white' : 'bg-white bg-opacity-50'
      }`}
      type='button'
      onClick={onClick}
      aria-label={`Go to product ${index + 1}`}
    >
      <span className='sr-only'>{`Go to product ${index + 1}`}</span>
    </button>
  )
}

export default function ShopCarousel({ products }: { products: Product[] }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slidesToScroll, setSlidesToScroll] = useState(1)

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  const updateSlidesToScroll = useCallback(() => {
    if (window.innerWidth >= 1280) {
      setSlidesToScroll(4)
    } else if (window.innerWidth >= 1024) {
      setSlidesToScroll(3)
    } else if (window.innerWidth >= 640) {
      setSlidesToScroll(2)
    } else {
      setSlidesToScroll(1)
    }
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    // Update Embla carousel with slidesToScroll
    emblaApi.reInit({ slidesToScroll })

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    // Initialize the slidesToScroll based on window size
    updateSlidesToScroll()
    window.addEventListener('resize', updateSlidesToScroll)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
      window.removeEventListener('resize', updateSlidesToScroll)
    }
  }, [emblaApi, onSelect, updateSlidesToScroll, slidesToScroll])

  const handleShopNow = (product: Product) => {
    setSelectedProduct(product)
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  const totalSlides = Math.ceil(products.length / slidesToScroll)

  return (
    <>
      <div className='container mx-auto px-4 cursor-pointer'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {products.map((product, index) => (
              <div
                key={index}
                className='flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_25%] pl-4 relative transition-transform duration-300 ease-in-out'
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
                index={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
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