'use client';

import { useState } from 'react';
import { useScrollTo } from '../hooks/useScrollTo';
import { NewsletterForm } from './newsletter-form';
import NewsletterSuccessPopup from './newsletter-success-popup';

const CTASection = ({ scrollToShop }: { scrollToShop: () => void }) => (
  <section className='px-4 py-16 text-center bg-teal-500'>
    <h2 className='text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight font-bold text-white mb-8 sm:mb-10 lg:mb-12'>
      Start Your Path to Simple Healing Today.
    </h2>
    <button
      onClick={scrollToShop}
      className='uppercase bg-white text-teal-500 font-bold border border-white hover:bg-teal-600 hover:text-white px-6 py-2 rounded-full transition duration-300'
    >
      Shop Now
    </button>
  </section>
);

export default function Newsletter() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const scrollOffset = 100;
  const scrollTo = useScrollTo(scrollOffset);

  const scrollToShop = () => scrollTo('shop');

  const handleSuccess = () => {
    setShowSuccessPopup(true);
  };

  const handleError = (message: string) => {
    console.error('Newsletter submission error:', message);
  };

  return (
    <>
      <section
        className='bg-teal-50 px-4 rounded-lg text-center py-16'
        id='newsletter'
      >
        <h2 className='text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight font-bold text-teal-500 mb-4'>
          Be the First to Get Updates
        </h2>
        <p className='text-base mb-8 font-poppins text-justify md:text-center'>
          Want to keep in touch? Drop your email below to get the latest
          updates, special offers, and wellness tips from Iyasu.
        </p>
        <NewsletterForm onSuccess={handleSuccess} onError={handleError} />
      </section>

      <CTASection scrollToShop={scrollToShop} />

      {showSuccessPopup && (
        <NewsletterSuccessPopup onClose={() => setShowSuccessPopup(false)} />
      )}
    </>
  );
}