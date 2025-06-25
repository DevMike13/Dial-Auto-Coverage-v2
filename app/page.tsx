'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// import Step1 from './components/steps/Step1';
import { SuspenseStep1 } from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step6 from './components/steps/Step6';
// import Step7 from './components/steps/Step7';
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


  // const campaignId = searchParams.get('offer_id');
  // const affId = searchParams.get('affiliate_id');
  // const s1 = searchParams.get('sub1');
  // console.log('Campaign ID:', campaignId);
  // console.log('Affiliate ID:', affId);
  // console.log('S1:', s1);

  const renderStep = () => {
    switch (step) {
      case 0: return <SuspenseStep1 />;
      case 1: return <Step2 />;
      // case 2: return <Step6 />;
      // case 3: return <Step4 />;
      // case 4: return <Step3 />;
      case 2: return <SuspenseStep7 />;
      default: return <SuspenseStep1 />;
    }
  };
  if (!hasHydrated) return null;

  return (
    <main className="w-full h-auto bg-[#e8f1ff] overflow-hidden">
      <Header />
      <div className='w-full flex justify-center mt-10 mb-20'>
        <div className='md:max-w-[500px] max-w-[330px] w-full'>
          {renderStep()}
        </div>
      </div>
      <Footer />
    </main>
  );
}
