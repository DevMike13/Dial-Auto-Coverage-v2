'use client';

import { useEffect, useState } from 'react';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');

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

  return (
    <div className='w-full h-[90px] bg-[#e8f1ff] border-gray-300 border-b-1 flex items-center justify-between px-2 md:px-10'>
      <div>
        <a href="tel:+18336703557">
          <img src="/DAC_logo_1.png" alt="Logo" width={280} height={101} className='hidden sm:block' />
          <img src="/DAC_logo_1_M.png" alt="Logo" width={50} height={50} className='block sm:hidden' />
        </a>
      </div>
      <div className="hidden lg:block lg:text-lg font-semibold px-5">
        <p className='text-center'>
          74,337 Americans Saved on Auto Insurance TODAY {currentDate && `${currentDate}`}
        </p>
      </div>
      <a href="tel:+18336703557">
      <div className='flex items-center justify-center md:gap-5 gap-2'>
        <div>
          <img src="/ph-call-icn.png" alt="Logo" width={42} height={42} className='hidden sm:block animate-tada' />
          <img src="/ph-call-icn.png" alt="Logo" width={22} height={22} className='block sm:hidden animate-tada' />
        </div>
        <div>
          <p className='md:text-sm text-xs'>Speak with a Licensed Insurance Agent</p>
          {/* <p className='md:text-2xl text-sm font-bold text-red-500'><a href="tel:+18333321499">(833) 332 1499 TTY 711</a></p> */}
          <p className='md:text-sm text-xs'>Available: Mon - Sun  8AM - 6PM CST</p>
          <p className='md:text-sm text-xs'>FIll up the form to qualify</p>
        </div>
      </div>
      </a>
    </div>
  )
}

export default Header