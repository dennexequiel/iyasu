'use client';
import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for email
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Clear error and perform signup action
    setError('');
    setSuccess(true);

    // Simulate an API call to submit the email
    console.log('Email submitted:', email);
    // Reset email input after submission
    setEmail('');
  };

  return (
    <div className="bg-teal-50 p-8 rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-bold text-teal-500 mb-4">Stay Updated With Iyasu</h2>
      <p className="text-lg text-gray-700 mb-6 font-poppins">
        Want to keep in touch? Drop your email below to get the latest updates, special offers, and wellness tips from Iyasu.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="relative w-full max-w-xs mb-4"> {/* Container for input and button */}
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 outline-none rounded-full p-4 w-full hover:border-teal-500 focus:ring-1 focus:ring-teal-500 transition duration-300"
          />
          <button
            type="submit"
            className="uppercase absolute mr-1 right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white font-bold p-3 rounded-full hover:bg-teal-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message color */}
      {success && <p className="text-green-500 mt-2">Thank you for signing up!</p>}
    </div>
  );
};

export default Newsletter;

