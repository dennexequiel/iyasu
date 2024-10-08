'use client';

import contactImage from '@/app/images/contact.png';
import Image from 'next/image';
import { useState } from 'react';
import { z } from 'zod';

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(255, 'Name must be at most 255 characters long'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be at most 255 characters long'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

// Infer the TypeScript type from the Zod schema
type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  // Errors are stored as an object with field names as keys and arrays of error messages as values
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );

  // Validate a single field
  const validateField = (name: keyof FormData, value: string) => {
    try {
      // Pick only the relevant field from the schema and parse the value
      // The complex type assertion is used to maintain type safety with dynamic field names
      formSchema
        .pick({ [name]: true } as { [K in typeof name]: true })
        .parse({ [name]: value });
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map((err) => err.message);
      }
      return ['Invalid input'];
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the field as the user types
    const fieldErrors = validateField(name as keyof FormData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors,
    }));
  };

  // Validate all form fields
  const validateForm = () => {
    const newErrors: { [key: string]: string[] } = {};
    let isValid = true;

    // Use type assertion to ensure type safety when using Object.keys with FormData
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const fieldErrors = validateField(key, formData[key]);
      if (fieldErrors.length > 0) {
        newErrors[key] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitStatus(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          'Thank you for your message. We will get back to you soon!'
        );
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        throw new Error('Server responded with an error');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate className for input fields based on error state
  const getInputClassName = (fieldName: keyof FormData) => {
    return `border ${
      errors[fieldName] && errors[fieldName].length > 0
        ? 'border-red-500 ring-1 ring-red-500'
        : 'border-gray-300'
    } outline-none rounded-full w-full focus:ring-1 ${
      errors[fieldName] && errors[fieldName].length > 0
        ? 'focus:ring-red-500 focus:border-red-500'
        : 'focus:ring-teal-500 focus:border-teal-500'
    } transition duration-300 px-4 py-2`;
  };

  return (
    <section className='bg-white max-w-screen-2xl md:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex flex-col md:flex-row py-16 px-4 md:px-8'>
      {/* Form Section */}
      <div className='w-full md:w-1/2 md:pr-8 mb-8 md:mb-0'>
        <h2 className='text-3xl font-bold text-teal-500 mb-4'>Get in Touch</h2>
        <p className='text-lg mb-8 font-poppins w-full xl:w-10/12'>
          We would love to hear from you. Please fill out the form below and we
          will get back to you as soon as possible.
        </p>
        <form
          onSubmit={handleSubmit}
          className='space-y-4 md:space-y-6 w-full xl:w-10/12'
        >
          {/* Success/Error Message */}
          {submitMessage && (
            <div
              className={`p-3 rounded-[24px] ${
                submitStatus === 'success'
                  ? 'bg-teal-50 text-teal-500'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {submitMessage}
            </div>
          )}
          <div>
            <label htmlFor='name' className='block text-sm mb-1 font-poppins'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className={getInputClassName('name')}
            />
            {errors.name &&
              errors.name.map((error, index) => (
                <p key={index} className='text-red-500 text-sm mt-1'>
                  {error}
                </p>
              ))}
          </div>
          <div>
            <label htmlFor='email' className='block text-sm mb-1 font-poppins'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className={getInputClassName('email')}
            />
            {errors.email &&
              errors.email.map((error, index) => (
                <p key={index} className='text-red-500 text-sm mt-1'>
                  {error}
                </p>
              ))}
          </div>
          <div>
            <label
              htmlFor='message'
              className='block text-sm mb-1 font-poppins'
            >
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className={`${getInputClassName(
                'message'
              )} rounded-[24px] min-h-24`}
              placeholder='Type your message...'
            ></textarea>
            {errors.message &&
              errors.message.map((error, index) => (
                <p key={index} className='text-red-500 text-sm mt-1'>
                  {error}
                </p>
              ))}
          </div>
          <div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='uppercase w-full sm:w-auto bg-teal-500 text-white font-bold border border-teal-500 hover:bg-white hover:text-teal-500 px-6 py-2 rounded-full transition duration-300 disabled:opacity-50 disabled:hover:bg-teal-500 disabled:hover:text-white'
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div className='hidden md:block w-full md:w-1/2 bg-blue-50 rounded-2xl overflow-hidden'>
        <Image
          src={contactImage}
          alt='Get in touch image'
          width={600}
          height={600}
          className='object-cover w-full h-full rounded-2xl'
          placeholder='blur'
        />
      </div>
    </section>
  );
}
