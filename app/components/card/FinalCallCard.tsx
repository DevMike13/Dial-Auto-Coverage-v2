'use client';
import React from 'react'
import { useFormStore } from 'stores/formStore';

type FinalCallCardProps = {
    phoneNumber: string;
};

declare global {
    interface Window {
        gtag_report_conversion?: (url?: string) => void;
    }
}

const FinalCallCard = () => {
    const { formData } = useFormStore();
    const didNumber = formData.did_number;
    const medicareEnrollment = formData.medicareEnrollment;
    // const formattedNumber = phoneNumber.replace(/(?!^\+)[^\d]/g, '');
    // const telHref = `tel:${formattedNumber}`;
    const handleClick = () => {
        if (typeof window !== "undefined" && typeof window.gtag_report_conversion === "function") {
            window.gtag_report_conversion();
        } else {
            console.warn("gtag_report_conversion is not available");
        }
    };

  return (
    <div className='max-w-[510px] w-full md:mb-20 md:px-4 px-3 py-3 shadow-md flex flex-col justify-center items-center border-2 border-white gap-5 bg-[#f2f7ff] mt-5'>
        <div 
            className='w-full hover:cursor-pointer'
            onClick={() => {
                handleClick();

                if (didNumber) {
                    window.location.href = `tel:${didNumber}`;
                } else {
                    console.warn('No valid phone number (didNumber) found.');
                }
            }}
        >
            <div className='w-full flex items-center md:gap-5 gap-5 bg-[#1c2753] px-5 py-5 rounded-lg'>
                <img src="/thank-btn.jpg" alt="Logo" width={70} height={70} className='hidden rounded-xl sm:block animate-tada' />
                <img src="/thank-btn.jpg" alt="Logo" width={42} height={42} className='block rounded-xl sm:hidden animate-tada' />
                <div className='flex flex-col items-start'>
                    <p className='md:text-2xl text-lg font-bold text-white'>CALL TOLL-FREE</p>
                    {medicareEnrollment === "Yes" && (
                        <a
                            id="phoneLink1"
                            href={didNumber ? `tel:${didNumber}` : 'tel:'}
                            className="md:text-2xl text-lg font-bold text-red-500"
                        >
                            {didNumber || 'N/A'}
                        </a>
                    )}

                    {medicareEnrollment === "No" && (
                        <a
                            id="phoneLink2"
                            href={didNumber ? `tel:${didNumber}` : 'tel:'}
                            className="md:text-2xl text-lg font-bold text-red-500"
                        >
                            {didNumber || 'N/A'}
                        </a>
                    )}

                </div>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-green-500 animate-ping flex justify-center items-center md:mt-0 mt-1'>
                <div className='w-1 h-1 rounded-full bg-green-900'></div>
            </div>
            <p className='md:text-sm text-xs'>Licensed Insurance Agents are standing by ready to assist you.</p>
        </div>
    </div>
  )
}

export default FinalCallCard