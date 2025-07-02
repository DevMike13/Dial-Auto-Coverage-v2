'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative w-full bg-[#0c2e5d] text-white overflow-hidden pt-28 pb-10 px-5 lg:-mt-10 md:px-10 flex flex-col items-center gap-5">

     {/* Centered Downward Arc */}
    <div className="absolute -top-1 left-0 lg:-top-10 lg:-left-17 md:-left-10 w-[100%] lg:w-[110%] md:w-[110%] overflow-hidden leading-[0] z-0">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className='relative block w-[calc(100%+1.3px)] md:h-[120px] lg:h-[174px] h-[60px]' style={{ transform: 'rotateY(180deg)' }}>
          <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" fill='#e8f1ff'></path>
      </svg>
    </div>

      {/* Footer content */}
      <div className="z-10 pt-24">
        <p className="text-center text-lg">
          We proudly collaborate with the following company:
        </p>
        <div className="flex justify-center items-center mt-2">
          <img
            src="https://media.offerwings.com/wp-content/uploads/2025/07/allStateLogo.png"
            alt="Allstate Logo"
            className="w-40 h-auto"
          />
        </div>
      </div>

      <ul className="z-10 flex flex-col md:flex-row justify-center items-center gap-3 text-sm">
        <li>
          <Link href="/terms-&-conditions" target="_blank" className="underline">Terms & Conditions</Link>
        </li>
        <li className="hidden md:inline">|</li>
        <li>
          <Link href="/privacy-policy" target="_blank" className="underline">Privacy Policy</Link>
        </li>
        <li className="hidden md:inline">|</li>
        <li>
          <Link href="/about" target="_blank" className="underline">About Us</Link>
        </li>
        <li className="hidden md:inline">|</li>
        <li>
          <Link href="/california-residents" target="_blank" className="underline">California Residents</Link>
        </li>
      </ul>

      <p className="text-center text-sm z-10">
        © 2025 Dialautocoverage.com. All rights reserved.
      </p>

      <div className="z-10 text-xs md:text-sm max-w-5xl space-y-3">
        <p>
          This website is a marketing platform and is not affiliated with any government agency or insurance provider. We connect consumers with licensed insurance agents and carriers through Pay-Per-Call partnerships. Your call may be directed to a third-party partner or licensed agent who can assist with your insurance needs.
        </p>

        <h6 className="font-semibold">Consent & TCPA Disclosure</h6>

        <p>
          By submitting your information on this site or calling the number provided, you provide your express written consent to be contacted by DialAutoCoverage, its marketing partners, and licensed insurance agents via phone call, email, or text message for marketing purposes—using an automatic telephone dialing system or pre-recorded voice messages—even if your number is listed on a federal, state, or corporate Do Not Call list. Consent is not a condition of any purchase. Standard messaging and data rates may apply.
        </p>

        <p>
          Quotes and coverage availability vary by state and individual eligibility. All calls are recorded for quality assurance. Use of this site constitutes acceptance of our{' '}
          <Link href="/terms-&-conditions" className="font-bold text-blue-500">Terms of Service</Link> and{' '}
          <Link href="/privacy-policy" className="font-bold text-blue-500">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default Footer;
