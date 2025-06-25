'use client';

import { useFormStore } from '@/stores/formStore';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';

const Step7 = () => {
  const { formData, updateField, nextStep, prevStep, resetForm } = useFormStore();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const phone = formData.phone?.trim() || '';
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
  
    setError('');
    setIsSubmitting(true);
  
    try {
      useFormStore.setState({
        formData: {
          ...formData,
          phone,
        },
      });
  
      router.push('/thank-you');
  
      setTimeout(() => {
        // resetForm();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold md:text-4xl text-2xl text-center'>What's your phone number?</h1>
      <p className='text-center'>We’ll use this to contact you with your benefit information.</p>

      <input
        className="w-full h-[65px] bg-white text-center rounded-md text-xl"
        placeholder="Phone Number"
        value={formData.phone || ''}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
          updateField('phone', digits);
        }}
        inputMode="numeric"
        maxLength={10}
      />

      {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

      <div className="flex justify-between gap-2 mt-5">
        <button
          onClick={prevStep}
          className="w-full md:h-[65px] h-[55px] rounded-md cursor-pointer md:text-2xl text-xl font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full md:h-[65px] h-[55px] rounded-md cursor-pointer md:text-2xl text-xl font-semibold text-white ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1c2753]'
          }`}
        >
         {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  );
};

export const SuspenseStep7 = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Step7 />
  </Suspense>
);
