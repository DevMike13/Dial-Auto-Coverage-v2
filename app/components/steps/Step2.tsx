'use client';

import { useFormStore } from '@/stores/formStore';
import { useState } from 'react';
import CallCard from '../card/CallCard';

const Step2 = () => {
  const { formData, updateField, nextStep } = useFormStore();
  const [error, setError] = useState('');

  const fetchZipData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ZIP_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ZIP_API_TOKEN}`,
        },
        body: JSON.stringify({ zip: formData.zip }),
      });

      if (!response.ok) throw new Error('Failed to fetch ZIP data');

      const result = await response.json();

      if (result.success && result.data) {
        const state = result.data.state;
        updateField('state', state);
        nextStep();
      } else {
        alert('Please enter a valid ZIP code.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to verify ZIP code. Please try again.');
    }
  };

  const handleNext = () => {
    if (!formData.zip.trim()) {
      setError('The field is required');
      return;
    }
    setError('');
    fetchZipData();
  };

  return (
    <div className="w-full relative px-4 md:px-10 flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-5">
      {/* Left Content */}
      <div className="relative w-full md:max-w-[700px]">
        <h1 className="text-2xl lg:text-4xl font-semibold z-10 relative leading-snug">
          Drive Smart! Save Big!
        </h1>
        <h1 className="text-2xl lg:text-4xl font-semibold z-10 relative">
          Get Affordable Car Insurance Today.
        </h1>
        <p className="text-md lg:text-lg max-w-sm mt-4 font-semibold z-10 relative">
          Switch today and see why thousands are making the move.
        </p>

        <div className="my-5 flex flex-col gap-3">
          {['Instant Quotes', 'Customized Coverage', 'Fast Claims & Top-Rated Support'].map((item, idx) => (
            <div className="flex items-center gap-3" key={idx}>
              <div className="w-5 h-5">
                <img src="/Check.png" alt="" className="w-full h-auto" />
              </div>
              <p className="text-sm lg:text-base">{item}</p>
            </div>
          ))}
        </div>

        <p className="text-md lg:text-lg mt-4 font-semibold z-10 relative max-w-sm">
          Don’t overpay for protection. Get your FREE quote in under 60 seconds!
        </p>

        {/* Car image */}
        <img
          src="/Car.png"
          alt=""
          className="absolute top-1/2 md:-right-45 lg:-right-30 transform -translate-y-[40px] w-[200px] md:w-[280px] lg:w-[350px] hidden md:block"
        />
      </div>

      {/* Right ZIP Form */}
      <div className="flex flex-col gap-5 w-full md:max-w-[300px] bg-[#113361] px-5 py-6 rounded-2xl text-white shadow-xl z-10">
        <h1 className="font-bold text-xl md:text-2xl text-center">
          Enter your ZIP code
        </h1>
        <input
          className="w-full h-[45px] bg-[#FFFFFF] text-[#113361] text-center rounded-md text-xl"
          placeholder="Zip Code"
          value={formData.zip}
          onChange={(e) => {
            const numericZip = e.target.value.replace(/\D/g, '').slice(0, 5);
            updateField('zip', numericZip);
          }}
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
        />
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        <button
          onClick={handleNext}
          className="w-full px-6 py-2 rounded-md bg-[#1978ff] text-white font-semibold text-center"
        >
          Submit
        </button>
        {/* <CallCard /> */}
      </div>
    </div>
  );
};

export default Step2;
