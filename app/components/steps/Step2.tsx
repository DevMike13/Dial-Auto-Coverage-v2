'use client';

import { useFormStore } from '@/stores/formStore';
import { useState, useEffect } from 'react';
import CallCard from '../card/CallCard';

const Step2 = () => {
  const { formData, updateField, nextStep } = useFormStore();
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentDate, setCurrentDate] = useState('');

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) return 600;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const date = new Date();

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);

    setCurrentDate(formattedDate);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="w-full relative flex flex-col justify-center items-center gap-5">
      <div className="block lg:hidden font-semibold px-5 self-center">
        <p className='text-center text-lg'>
          74,337 Americans Saved on Auto Insurance TODAY {currentDate && `${currentDate}`}
        </p>
      </div>

      <div className="w-full relative px-4 md:px-10 flex flex-col-reverse md:flex-row items-center lg:items-start justify-between gap-8 md:gap-5">
        {/* Left Content */}
        <div className="relative w-full md:max-w-full flex justify-between">
          <div className='relative flex flex-col justify-center items-center md:items-start w-full'>
            <h1 className="text-2xl lg:text-3xl text-center md:text-left font-semibold z-10 relative leading-snug">
              Drive Smart! Save Big!
            </h1>
            <h1 className="text-2xl lg:text-3xl text-center md:text-left font-semibold z-10 relative">
              Get Affordable Car Insurance Today.
            </h1>
            <p className="text-md max-w-sm mt-2 text-center md:text-left lg:mt-4 font-semibold z-10 relative">
              Switch today and see why thousands are making the move.
            </p>

            <div className="my-5 flex flex-col gap-1 lg:gap-3">
              {['Instant Quotes', 'Customized Coverage', 'Fast Claims & Top-Rated Support'].map((item, idx) => (
                <div className="flex items-center gap-3" key={idx}>
                  <div className="w-5 h-5">
                    <img src="/Check.png" alt="" className="w-full h-auto" />
                  </div>
                  <p className="text-sm lg:text-base">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-md mt-2 lg:mt-4 text-center md:text-left font-semibold z-50 relative max-w-sm">
              Don’t overpay for protection. Get your FREE quote in under 60 seconds!
            </p>

            <p className="text-red-600 relative w-full text-lg font-semibold hidden md:block lg:hidden">
                Hurry! This offer expires soon {minutes}:{seconds}
            </p>
          </div>
          

          <div className="absolute top-1/2 lg:left-90 transform -translate-y-[30px] hidden lg:block w-[320px] z-10">
            <div className="relative w-full overflow-visible">
              <img
                src="/Car.png"
                alt=""
                className="w-[280px]"
              />
              <p className="text-red-600 relative -bottom-6 w-full text-center lg:text-lg font-semibold">
                Hurry! This offer expires soon {minutes}:{seconds}
              </p>
            </div>
          </div>

          {/* COMMENTS */}
          <div className='flex flex-col gap-2 hidden lg:flex'>
            <div className="bg-white border-1 border-[#7da0f7] max-w-md p-3 rounded-lg flex flex-col justify-between gap-1.5 z-20 mx-auto">
                <h3 className="font-secondary font-semibold text-sm">From Overpaying to Smart Saving</h3>
                <img src="/bnr-review-star.png" alt="" className="w-20 h-auto" />
                <p className="font-secondary text-xs">I used to overpay for insurance. Now I’ve got solid coverage and more money in my pocket!</p>
                <div className="flex gap-3 lg:items-center flex-col lg:flex-row">
                    <div className="flex items-center gap-1">
                        <img src="/rvwr-1.jpg" alt="" className="rounded-full w-7" />
                        <p className="font-secondary text-sm">Rachel M.</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <img src="/circle-check.svg" alt="" className="w-3 h-auto" />
                            <p className="font-secondary text-green-400 text-xs">Verified Member</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-1 border-[#7da0f7] max-w-md p-3 rounded-lg flex flex-col justify-between gap-2 z-20 mx-auto">
                <h3 className="font-secondary font-semibold text-sm">Big Savings, Same Great Coverage</h3>
                <img src="/bnr-review-star.png" alt="" className="w-20 h-auto" />
                <p className="font-secondary text-xs">I never realized how much I was spending until I switched. Now I’m saving big and still fully covered!</p>
                <div className="flex gap-3 lg:items-center flex-col lg:flex-row">
                    <div className="flex items-center gap-1">
                        <img src="/rvwr-2.jpg" alt="" className="rounded-full w-7" />
                        <p className="font-secondary text-sm">Daniel C.</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <img src="/circle-check.svg" alt="" className="w-3 h-auto" />
                            <p className="font-secondary text-green-400 text-xs">Verified Member</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className='absolute flex gap-15 -bottom-25 left-1/2 transform -translate-x-1/3 z-50 hidden lg:flex'>
            <div className="flex flex-col items-center justify-center">
              <img src="/google-logo.png" alt="" className="w-20 h-auto" />
              <p className="font-secondary text-md">Rated 4.9</p>
              <img src="/star-rating-4-7.svg" alt="" className="w-20 h-auto" />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/Facebook-logo.png" alt="" className="w-20 h-auto" />
              <p className="font-secondary text-md">Rated 4.9</p>
              <img src="/star-rating-4-5.svg" alt="" className="w-20 h-auto" />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/trustpilot-logo.png" alt="" className="w-20 h-auto" />
              <p className="font-secondary text-md">Rated 4.9</p>
              <img src="/star-rating-4-5.svg" alt="" className="w-20 h-auto" />
            </div>

            <div className="flex flex-col items-center justify-center">
              <img src="/Okendo-logo.png" alt="" className="w-20 h-auto" />
              <p className="font-secondary text-md">Rated 4.9</p>
              <img src="/star-rating-4-7.svg" alt="" className="w-20 h-auto" />
            </div>
          </div>
        </div>

        {/* Right ZIP Form */}
        <div className='flex flex-col justify-center items-center gap-8 md:gap-5'>
          <div className="flex flex-col gap-5 w-full md:max-w-[240px] lg:max-w-[300px] bg-[#113361] px-5 py-6 rounded-2xl text-white shadow-xl z-10">
            <h1 className="font-bold text-md md:text-lg text-center">
              Enter your ZIP code
            </h1>
            <input
              className="w-full h-[35px] lg:h-[45px] bg-[#FFFFFF] text-[#113361] text-center rounded-md text-xl"
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
              className="w-full px-6 py-1 lg:py-2 rounded-md bg-[#1978ff] text-white font-semibold text-center hover:cursor-pointer"
            >
              Submit
            </button>
            {/* <CallCard /> */}
          </div>
          <img
            src="/Car.png"
            alt=""
            className="w-[420px] flex lg:hidden"
          />
          <p className="text-red-600 relative w-full text-2xl text-center font-semibold block md:hidden lg:hidden">
            Hurry! This offer expires soon {minutes}:{seconds}
          </p>
        </div>
      </div>

      {/* COMMENTS MOBILE AND TABLET */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-4 flex md:flex lg:hidden'>
        <div className="bg-white border-1 border-[#7da0f7] max-w-xs p-3 rounded-lg flex flex-col justify-between gap-1.5 z-20 ">
            <h3 className="font-secondary font-semibold text-sm">From Overpaying to Smart Saving</h3>
            <img src="/bnr-review-star.png" alt="" className="w-20 h-auto" />
            <p className="font-secondary text-xs">I used to overpay for insurance. Now I’ve got solid coverage and more money in my pocket!</p>
            <div className="flex gap-3 lg:items-center flex-col lg:flex-row">
                <div className="flex items-center gap-1">
                    <img src="/rvwr-1.jpg" alt="" className="rounded-full w-7" />
                    <p className="font-secondary text-sm">Rachel M.</p>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <img src="/circle-check.svg" alt="" className="w-3 h-auto" />
                        <p className="font-secondary text-green-400 text-xs">Verified Member</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white border-1 border-[#7da0f7] max-w-xs p-3 rounded-lg flex flex-col justify-between gap-1.5 z-20">
            <h3 className="font-secondary font-semibold text-sm">Big Savings, Same Great Coverage</h3>
            <img src="/bnr-review-star.png" alt="" className="w-20 h-auto" />
            <p className="font-secondary text-xs">I never realized how much I was spending until I switched. Now I’m saving big and still fully covered!</p>
            <div className="flex gap-3 lg:items-center flex-col lg:flex-row">
                <div className="flex items-center gap-1">
                    <img src="/rvwr-2.jpg" alt="" className="rounded-full w-7" />
                    <p className="font-secondary text-sm">Daniel C.</p>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <img src="/circle-check.svg" alt="" className="w-3 h-auto" />
                        <p className="font-secondary text-green-400 text-xs">Verified Member</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      {/* PARTNERS TABLET */}
      <div className='flex self-center gap-10 hidden md:flex lg:hidden'>
        <div className="flex flex-col items-center justify-center">
          <img src="/google-logo.png" alt="" className="w-20 h-auto" />
          <p className="font-secondary text-md">Rated 4.9</p>
          <img src="/star-rating-4-7.svg" alt="" className="w-20 h-auto" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src="/Facebook-logo.png" alt="" className="w-20 h-auto" />
          <p className="font-secondary text-md">Rated 4.9</p>
          <img src="/star-rating-4-5.svg" alt="" className="w-20 h-auto" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src="/trustpilot-logo.png" alt="" className="w-20 h-auto" />
          <p className="font-secondary text-md">Rated 4.9</p>
          <img src="/star-rating-4-5.svg" alt="" className="w-20 h-auto" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src="/Okendo-logo.png" alt="" className="w-20 h-auto" />
          <p className="font-secondary text-md">Rated 4.9</p>
          <img src="/star-rating-4-7.svg" alt="" className="w-20 h-auto" />
        </div>
      </div>

      {/* PARTNERS MOBILE */}
      <div className='flex flex-col self-center gap-10 flex md:hidden lg:hidden'>
        <div className='flex gap-10'>
          <div className="flex flex-col items-center justify-center">
            <img src="/google-logo.png" alt="" className="w-20 h-auto" />
            <p className="font-secondary text-md">Rated 4.9</p>
            <img src="/star-rating-4-7.svg" alt="" className="w-20 h-auto" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src="/Facebook-logo.png" alt="" className="w-20 h-auto" />
            <p className="font-secondary text-md">Rated 4.9</p>
            <img src="/star-rating-4-5.svg" alt="" className="w-20 h-auto" />
          </div>
        </div>
        
        <div className='flex gap-10'>
          <div className="flex flex-col items-center justify-center">
            <img src="/trustpilot-logo.png" alt="" className="w-20 h-auto" />
            <p className="font-secondary text-md">Rated 4.9</p>
            <img src="/star-rating-4-5.svg" alt="" className="w-20 h-auto" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src="/Okendo-logo.png" alt="" className="w-20 h-auto" />
            <p className="font-secondary text-md">Rated 4.9</p>
            <img src="/star-rating-4-7.svg" alt="" className="w-20 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
