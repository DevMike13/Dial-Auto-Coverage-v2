'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { SuspenseStep1 } from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import { SuspenseStep7 } from './components/steps/Step7';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useFormStore } from 'stores/formStore';



export default function Home() {
  const { step, hasHydrated, updateField } = useFormStore();
  const pathname = usePathname();
  

  useEffect(() => {
    if (pathname === '/') {
      localStorage.removeItem('inbound_number');
    }
  }, [pathname]);

  useEffect(() => {
    const externalScript = document.createElement("script");
    externalScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-17128153028";
    externalScript.async = true;
    document.head.appendChild(externalScript);

    const initScript = document.createElement("script");
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17128153028');
    `;
    document.head.appendChild(initScript);

    return () => {
      document.head.removeChild(externalScript);
      document.head.removeChild(initScript);
    };
  }, []);

  const renderStep = () => {
    switch (step) {
      
      case 0: return <Step2 />;
      case 1: return <SuspenseStep1 />;
      // case 2: return <Step6 />;
      // case 3: return <Step4 />;
      // case 4: return <Step3 />;
      case 2: return <SuspenseStep7 />;
      default: return <Step2 />;
    }
  };
  if (!hasHydrated) return null;

  return (
    <main className="w-full h-auto bg-[#e8f1ff] overflow-hidden">
      <Header />
      <div className='w-full flex justify-center mt-10'>
        <div className='md:max-w-full max-w-[330px] w-full'>
          {renderStep()}
        </div>
      </div>
      <Footer />
    </main>
  );
}
