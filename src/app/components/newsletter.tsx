'use client';

import { FormEvent, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { z } from 'zod';
import { useScrollTo } from '../hooks/useScrollTo';

// Zod schema for email validation
const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be at most 255 characters long'),
});

// Sub-components
const SubmitButton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <button
    type='submit'
    disabled={isLoading}
    className='uppercase absolute mr-1 right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white font-bold p-3 border border-teal-500 rounded-full transition duration-300 hover:bg-white hover:text-teal-500 disabled:opacity-50 disabled:hover:bg-teal-500 disabled:hover:text-white'
  >
    {isLoading ? 'Signing up' : 'Sign Up'}
  </button>
);

const NewsletterForm: React.FC<{
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string | null;
}> = ({ email, setEmail, handleSubmit, isLoading, error }) => (
  <form onSubmit={handleSubmit} className='flex flex-col items-center'>
    <div className='relative w-full max-w-md mb-4'>
      <input
        type='email'
        name='email'
        placeholder='name@email.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`border ${
          error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
        } outline-none rounded-full p-4 w-full focus:ring-1 ${
          error
            ? 'focus:ring-red-500 focus:border-red-500'
            : 'focus:ring-teal-500 focus:border-teal-500'
        } transition duration-300`}
        required
        aria-label='Email address'
      />
      <SubmitButton isLoading={isLoading} />
    </div>
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
  </form>
);

const CTASection: React.FC<{ scrollToShop: () => void }> = ({
  scrollToShop,
}) => (
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

const SuccessPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 z-50'>
    <div className='relative bg-white rounded-3xl max-w-md w-full p-6'>
      <h2 className='text-2xl font-bold text-center mb-4 text-teal-500'>
        Success! You&apos;re Officially Subscribed
      </h2>
      <p className='text-center mb-6 font-poppins'>
        Stay in the loop! Get the latest updates straight to your inbox.
      </p>

      <a
        onClick={onClose}
        className='uppercase font-bold flex items-center justify-center mt-6 text-neutral-500 hover:text-teal-500 transition duration-300 cursor-pointer'
      >
        <FaArrowLeft    className='w-4 h-4 mr-1' />
        Back
      </a>
    </div>
  </div>
);

// Main component
export default function Newsletter() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollOffset = 100;
  const scrollTo = useScrollTo(scrollOffset);

  const scrollToShop = () => scrollTo('shop');

  const validateEmail = (email: string): boolean => {
    try {
      emailSchema.parse({ email });
      setError(null); // Clear error if email is valid
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

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
        setSuccessMessage(data.message || 'Successfully signed up!');
        setEmail('');
        setError(null);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        <p className='text-lg text-gray-700 mb-6 font-poppins'>
          Want to keep in touch? Drop your email below to get the latest
          updates, special offers, and wellness tips from Iyasu.
        </p>
        <NewsletterForm
          email={email}
          setEmail={handleEmailChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </section>

      <CTASection scrollToShop={scrollToShop} />

      {successMessage && (
        <SuccessPopup onClose={() => setSuccessMessage(null)} />
      )}
    </>
  );
}
