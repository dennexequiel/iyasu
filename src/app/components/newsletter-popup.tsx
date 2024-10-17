'use client';

import newsletterImage from '@/app/images/heal-simply-live-fully.jpg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { NewsletterForm } from './newsletter-form';
import NewsletterSuccessPopup from './newsletter-success-popup';

// Constants for localStorage and sessionStorage keys, delay, and scroll trigger
const NEWSLETTER_SUBSCRIBED_KEY =
  process.env.NEXT_PUBLIC_NEWSLETTER_SUBSCRIBED_KEY ||
  'iyasu_newsletter_subscribed';
const NEWSLETTER_POPUP_SHOWN_KEY =
  process.env.NEXT_PUBLIC_NEWSLETTER_POPUP_SHOWN_KEY ||
  'iyasu_newsletter_popup_shown';
const NEWSLETTER_POPUP_DELAY = parseInt(
  process.env.NEXT_PUBLIC_NEWSLETTER_POPUP_DELAY || '5000',
  10
);
const NEWSLETTER_POPUP_SCROLL_TRIGGER = parseInt(
  process.env.NEXT_PUBLIC_NEWSLETTER_POPUP_SCROLL_TRIGGER || '280',
  10
);

export const NewsletterPopup = () => {
  // State to manage the visibility of the popup and success message
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // Ref to store the scroll event listener for easy removal
  const scrollListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Check if the popup has been shown or if the user has subscribed
    const hasSeenPopup =
      sessionStorage.getItem(NEWSLETTER_POPUP_SHOWN_KEY) === 'true';
    const hasSubscribed =
      localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY) === 'true';

    if (!hasSeenPopup && !hasSubscribed) {
      // Show the popup after a delay
      const timer = setTimeout(() => {
        showPopup();
      }, NEWSLETTER_POPUP_DELAY);

      // Show the popup when the user scrolls past a certain point
      const handleScroll = () => {
        if (window.scrollY > NEWSLETTER_POPUP_SCROLL_TRIGGER) {
          showPopup();
        }
      };

      window.addEventListener('scroll', handleScroll);
      scrollListenerRef.current = handleScroll;

      // Cleanup event listener and timer on component unmount
      return () => {
        clearTimeout(timer);
        if (scrollListenerRef.current) {
          window.removeEventListener('scroll', scrollListenerRef.current);
        }
      };
    }
  }, []);

  // Function to show the popup and remove the scroll listener
  const showPopup = () => {
    setIsVisible(true);
    sessionStorage.setItem(NEWSLETTER_POPUP_SHOWN_KEY, 'true');
    if (scrollListenerRef.current) {
      window.removeEventListener('scroll', scrollListenerRef.current);
    }
    // Prevent scrolling on the body when the popup is visible
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the popup
  const handleClose = () => {
    setIsVisible(false);
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
  };

  // Handle successful newsletter subscription
  const handleSuccess = () => {
    setShowSuccessPopup(true);
    setIsVisible(false);
    localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
    if (scrollListenerRef.current) {
      window.removeEventListener('scroll', scrollListenerRef.current);
    }
    // Re-enable scrolling on the body
    document.body.style.overflow = 'auto';
  };

  // Handle errors during newsletter subscription
  const handleError = (message: string) => {
    console.error('Newsletter submission error:', message);
  };

  return (
    <>
      {isVisible && (
        <div className='fixed inset-0 backdrop-blur-sm backdrop-brightness-50 bg-white/10 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-3xl max-w-2xl w-full sm:w-[90%] md:max-w-4xl overflow-hidden relative'>
            {/* Close button */}
            <button
              onClick={handleClose}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10'
              aria-label='Close'
            >
              <IoMdClose className='w-6 h-6' />
            </button>
            <div className='flex flex-col md:flex-row h-full'>
              {/* Image section */}
              <div className='w-full md:w-1/2 relative h-60 md:h-auto lg:h-[350px] '>
                <Image
                  src={newsletterImage}
                  alt="Smiling woman in a yellow sweater by a laptop with the text 'HEAL SIMPLY, LIVE FULLY' and the Iyasu logo."
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className='rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl'
                  placeholder='blur'
                />
              </div>
              {/* Content section */}
              <div className='w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center'>
                <div>
                  <h2 className='text-2xl md:text-3xl font-bold text-center mb-4 text-teal-500'>
                    Welcome to Iyasu
                  </h2>
                  <p className='text-center mb-6 font-poppins text-sm md:text-base'>
                    Stay updated with the latest news, special offers, and
                    wellness tips from Iyasu.
                  </p>
                  {/* Newsletter subscription form */}
                  <NewsletterForm
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success popup */}
      {showSuccessPopup && (
        <NewsletterSuccessPopup onClose={() => setShowSuccessPopup(false)} />
      )}
    </>
  );
};
