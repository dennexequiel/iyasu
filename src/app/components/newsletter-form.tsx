'use client';

import { FormEvent, useState } from 'react';
import { FaCircleNotch } from "react-icons/fa";
import { z } from 'zod';

// Environment variable key for newsletter subscription status
const NEWSLETTER_SUBSCRIBED_KEY =
  process.env.NEXT_PUBLIC_NEWSLETTER_SUBSCRIBED_KEY ||
  'iyasu_newsletter_subscribed';

// Schema for validating email input
const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(320, 'Email must be at most 320 characters long'),
});

interface NewsletterFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

// Submit button component with loading state
const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
  <button
    type='submit'
    disabled={isLoading}
    className='uppercase absolute mr-1 right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white font-bold p-3 border border-teal-500 rounded-full transition duration-300 hover:bg-white hover:text-teal-500 disabled:opacity-50 disabled:hover:bg-teal-500 disabled:hover:text-white'
  >
    <span className={isLoading ? 'invisible' : 'visible'}>Sign Up</span>
    {isLoading && (
      <span className="absolute inset-0 flex items-center justify-center">
        <FaCircleNotch className="animate-spin h-5 w-5 text-white"/>
      </span>
    )}
  </button>
);

// Main newsletter form component
export const NewsletterForm = ({ onSuccess, onError }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to validate email using zod schema
  const validateEmail = (email: string): boolean => {
    try {
      emailSchema.parse({ email });
      setError(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
      return false;
    }
  };

  // Handler for email input change
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setError(null);
    }
  };

  // Handler for form submission
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
        localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
        onSuccess(data.message || 'Successfully signed up!');
        setEmail('');
        setError(null);
      } else {
        onError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      onError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <div className='relative w-full max-w-md mb-4'>
        <input
          type='email'
          name='email'
          placeholder='name@domain.com'
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className={`border ${
            error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
          } outline-none rounded-full py-4 pl-4 pr-24 w-full focus:ring-1 ${
            error
              ? 'focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-teal-500 focus:border-teal-500'
          } transition duration-300 truncate`}
          required
          aria-label='Email address'
          title={email}
          disabled={isLoading}
        />
        <SubmitButton isLoading={isLoading} />
      </div>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </form>
  );
};