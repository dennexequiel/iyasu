'use client';

import { FormEvent, useState } from 'react';
import { useScrollTo } from '../hooks/useScrollTo';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Sub-components
const SubmitButton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <button
    type='submit'
    disabled={isLoading}
    className='uppercase absolute mr-1 right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white font-bold p-3 rounded-full hover:bg-teal-600 transition duration-300 disabled:opacity-50'
  >
    Sign Up
  </button>
);

const NewsletterForm: React.FC<{
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}> = ({ email, setEmail, handleSubmit, isLoading }) => (
  <form onSubmit={handleSubmit} className='flex flex-col items-center'>
    <div className='relative w-full max-w-md mb-4'>
      <input
        type='email'
        name='email'
        placeholder='name@email.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border border-gray-300 outline-none rounded-full p-4 w-full focus:ring-1 focus:ring-teal-500 transition duration-300'
        required
        aria-label='Email address'
      />
      <SubmitButton isLoading={isLoading} />
    </div>
  </form>
);

const CTASection: React.FC<{ scrollToShop: () => void }> = ({ scrollToShop }) => (
  <section className='py-16 text-center bg-teal-500'>
    <h2 className='text-3xl font-bold text-white mb-4'>
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

// Main component
export default function Newsletter() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const scrollOffset = 350;
  const scrollTo = useScrollTo(scrollOffset);

  const scrollToShop = () => scrollTo('shop');

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsSuccess(false);
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setMessage('Signing up...');
    setIsSuccess(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Successfully signed up!');
        setEmail('');
      } else {
        setIsSuccess(false);
        setMessage(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setIsSuccess(false);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageColor = () => {
    if (isSuccess === null) return 'text-gray-500';
    if (isSuccess) return 'text-teal-500';
    return 'text-red-500';
  };

  return (
    <>
      <section className='bg-teal-50 p-8 rounded-lg text-center py-16'>
        <h2 className='text-3xl font-bold text-teal-500 mb-4'>
          Stay Updated With Iyasu
        </h2>
        <p className='text-lg text-gray-700 mb-6 font-poppins'>
          Want to keep in touch? Drop your email below to get the latest
          updates, special offers, and wellness tips from Iyasu.
        </p>
        <NewsletterForm email={email} setEmail={setEmail} handleSubmit={handleSubmit} isLoading={isLoading} />
        {message && (
          <p
            className={`${getMessageColor()} text-center w-full max-w-md mx-auto`}
            role='status'
          >
            {message}
          </p>
        )}
      </section>

      <CTASection scrollToShop={scrollToShop} />
    </>
  );
}