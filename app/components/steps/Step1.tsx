'use client';

import { Suspense } from 'react';
import { useFormStore } from '@/stores/formStore';
import CallCard from '../card/CallCard';

const Step1 = () => {
  const { updateField, nextStep, prevStep } = useFormStore();
  
  const options = ['Yes', 'No'];

  const handleOptionClick = (value: string) => {
    updateField('medicareEnrollment', value);
    nextStep();
  };

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold md:text-4xl text-2xl text-center mb-3'>Are you currently insured?</h1>
      {/* <p className='text-center'>Part A covers hospital care. Part B covers medical care.</p> */}
      <div className="flex flex-col gap-6 z-10">
        
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className='md:h-[65px] h-[55px] md:max-w-[300px] md:min-w-[300px] md:mx-auto rounded-md cursor-pointer bg-[#1c2753] md:text-2xl text-xl font-semibold text-white'
          >
            {option}
          </button>
        ))}
        {/* <button onClick={prevStep} className="w-full md:h-[65px] h-[55px] rounded-md cursor-pointer md:text-2xl text-xl font-semibold">
          Back
        </button> */}
      </div>
      {/* <CallCard /> */}
    </div>
  );
};

export const SuspenseStep1 = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Step1 />
  </Suspense>
);
