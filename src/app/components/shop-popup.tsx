'use client';

import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  title: string;
  shopeeLink: string;
  lazadaLink: string;
  tiktokLink: string;
}

interface ShopPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function ShopPopup({ isOpen, onClose, product }: ShopPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='relative bg-white rounded-3xl max-w-sm w-full p-6'>
        <h2 className='text-2xl font-bold text-center mb-4'>
          Shop {product.title}
        </h2>
        <p className='text-center mb-6'>
          Continue shopping at your preferred platform
        </p>

        <div className='space-y-4'>
          <button
            onClick={() => window.open(product.shopeeLink, '_blank')}
            className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500 px-6 py-2 rounded-full transition duration-300'
          >
            Shopee
          </button>
          <button
            onClick={() => window.open(product.lazadaLink, '_blank')}
            className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500 px-6 py-2 rounded-full transition duration-300'
          >
            Lazada
          </button>
          <button
            onClick={() => window.open(product.tiktokLink, '_blank')}
            className='uppercase w-full bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500 px-6 py-2 rounded-full transition duration-300'
          >
            Tiktok
          </button>
        </div>

        {/* Back Button at the Bottom */}
        <a
          onClick={onClose}
          className='uppercase font-bold flex items-center justify-center mt-6 text-neutral-500 hover:text-teal-500 transition duration-300 cursor-pointer'
        >
          <ArrowLeft className='w-4 h-4 mr-1' />
          Back
        </a>
      </div>
    </div>
  );
}
