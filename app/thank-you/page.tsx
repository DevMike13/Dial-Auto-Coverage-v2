'use client';

import { useFormStore } from 'stores/formStore';
import { Suspense, useState, useEffect } from 'react';
import FinalCallCard from '../components/card/FinalCallCard';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useSearchParams } from 'next/navigation';

declare global {
    interface Window {
      Retreaver: any;
    }
}

const ThankYouPage = () => {
    const searchParams = useSearchParams();
    const { resetForm } = useFormStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [inboundNumber, setInboundNumber] = useState<string | null>(null);
    const medicareEnrollment = searchParams.get('medicareEnrollment');
    const type = searchParams.get('type');
    const didNumber = searchParams.get('did_number');
    const [generatedNumber, setGeneratedNumber] = useState<string | null>(null);

    const [showStep1, setShowStep1] = useState(false);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);

    useEffect(() => {
        const externalScript = document.createElement("script");
        externalScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-17128153028";
        externalScript.async = true;
        document.head.appendChild(externalScript);

        const gtagScript = document.createElement("script");
        gtagScript.innerHTML = `
        function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-17128153028/7QWhCNCSnNAaEMS_q-c_',
                'event_callback': callback
            });
            return false;
          }
        `;
        document.head.appendChild(gtagScript);
    
        const initScript = document.createElement("script");
        initScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17128153028');
        `;
        document.head.appendChild(initScript);
    
        const conversionScript = document.createElement("script");
        conversionScript.innerHTML = `
          gtag('event', 'conversion', {'send_to': 'AW-17128153028/7QWhCNCSnNAaEMS_q-c_'});
        `;
        document.head.appendChild(conversionScript);
    
        return () => {
          document.head.removeChild(externalScript);
          document.head.removeChild(initScript);
          document.head.removeChild(conversionScript);
        };
      }, []);

    useEffect(() => {
        const storedNumber = localStorage.getItem('inbound_number');
        setInboundNumber(storedNumber);
    }, []);


    useEffect(() => {
        if (!isLoading && isSubmitted) {
        const script = document.createElement('script');
        script.type = 'text/javascript';

        if (medicareEnrollment == 'Yes' && type == 'Insured') {
            script.innerHTML = `
            (function() {
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.async = !0;
                a.defer = !0;
                a.src = "https:" + "//dist.routingapi.com/jsapi/v1/retreaver.min.js";
                a.onload = a.onreadystatechange = function() {
                Retreaver.configure({
                    host: "api.routingapi.com",
                    prefix: "https"
                });
                (new Retreaver.Campaign({
                    campaign_key: "d7bf2f46132f1fa53aef5dbca2eb8adc"
                })).auto_replace_numbers()
                };
                (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a)
            })();
            `;
        } else if (medicareEnrollment == 'No' && type == 'Uninsured') {
            script.innerHTML = `
            (function() {
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.async = !0;
                a.defer = !0;
                a.src = "https:" + "//dist.routingapi.com/jsapi/v1/retreaver.min.js";
                a.onload = a.onreadystatechange = function() {
                  Retreaver.configure({
                    host: "api.routingapi.com",
                    prefix: "https"
                  });
                  (new Retreaver.Campaign({
                    campaign_key: "a6bce58d9003656fb6d493ed32a5a0cc"
                  })).auto_replace_numbers()
                };
                (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a)
              })();
            `;
        }
        document.head.appendChild(script);
    }
    }, [medicareEnrollment, type, isLoading, isSubmitted]);

    // useEffect(() => {
    //     if (!isLoading && isSubmitted) {
    //         const inlineScript = document.createElement('script');
    //         inlineScript.type = 'text/javascript';
    //         if (medicareEnrollment == 'Yes' && type == 'Insured') {
    //             inlineScript.innerHTML = `
    //                 setTimeout(function() {
    //                 let phoneLink = document.getElementById("phoneLink1");
                    
    //                 if (phoneLink) {
    //                     phoneLink.href = "tel:+1" + phoneLink.innerText;
    //                 }
    //                 }, 2000);
    //             `;
                
    //         } else if (medicareEnrollment == 'No' && type == 'Uninsured') {
    //             inlineScript.innerHTML = `
    //                 setTimeout(function() {  
    //                 let phoneLink = document.getElementById("phoneLink2");
    //                 if (phoneLink) {
    //                     phoneLink.href = "tel:+1" +  phoneLink.innerText;
    //                 }
    //               }, 2000);
    //             `;
    //         }

    //         document.body.appendChild(inlineScript); 
    //         return () => {
    //             document.body.removeChild(inlineScript);
    //         };
    //     }
    // }, [medicareEnrollment, isLoading, isSubmitted]);
      

    useEffect(() => {
        if (isLoading) {
        let step = 0;
        const totalSteps = 800;
        const duration = 3000;
        const intervalTime = duration / totalSteps;

        const interval = setInterval(() => {
            step++;
            setProgress(step);

            if (step >= totalSteps) {
            clearInterval(interval);
            setIsLoading(false);
            setIsSubmitted(true);
            }
        }, intervalTime);

        const timeouts = [
            setTimeout(() => setShowStep1(true), 0),
            setTimeout(() => setShowStep2(true), 1000),
            setTimeout(() => setShowStep3(true), 2000),
        ];

        return () => {
            clearInterval(interval);
            timeouts.forEach(clearTimeout);
        };
        }
    }, [isLoading]);

    return (
        <main className="w-full h-auto bg-[#e8f1ff] overflow-hidden">
            <Header />
            <div className='w-full flex justify-center mt-10 mb-20'>
                <div className='md:max-w-[500px] max-w-[330px] w-full'>
                    <div className='flex flex-col gap-5'>
                        { isSubmitted ? (
                            <>
                                <p className="text-lg">
                                <b>Great News!</b> You're one step closer to reviewing your Auto Insurance plan options. To speak with a Licensed Insurance Agent right away, call us now by tapping the button below. Our team is standing by to assist you!
                                </p>
                                <FinalCallCard />
                            </>
                            ) : 
                            (
                                <>
                                {isLoading && (
                                    <div className='w-full mb-20'>
                                    <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                                        <div
                                        className="h-full rounden-full bg-blue-600 bg-stripes animate-stripes transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className='w-full max-w-[380px] m-auto mt-10 relative'>
                                        
                                        <div className="absolute top-[0px] left-[33px] h-[90%] md:top-[0px] md:left-[39.5px] md:h-[100%] border-l-2 border-dashed border-[#1c2753] z-0"></div>
                                        
                                        {/* Step 1: DETAILS */}
                                        {showStep1 && (
                                        <div className='flex items-center md:gap-20 gap-10 relative z-10 animate-fadeInUp'>
                                            <div className="relative">
                                            <div className='w-[68px] md:w-[80px] h-[68px] md:h-[80px] border-2 border-[#1c2753] rounded-full flex justify-center items-center bg-white relative'>
                                                <img src="/profile-ic.png" alt="Logo" width={30} height={30} className='hidden rounded-full sm:block' />
                                                <img src="/profile-ic.png" alt="Logo" width={26} height={26} className='block rounded-xl sm:hidden' />
                                            </div>
                                            <div className="absolute left-1/2 transform -translate-x-1/2 top-[70px] md:top-[75px] text-[#1c2753]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="12,16 8,10 16,10" />
                                                </svg>
                                            </div>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                            <p className='font-bold text-xl'>Reviewing Your Details</p>
                                            <p className='font-extralight text-sm'>Checking Your Information</p>
                                            </div>
                                        </div>
                                        )}

                                        {/* Step 2: AREA */}
                                        {showStep2 && (
                                        <div className='flex items-center mt-8 md:gap-20 gap-10 relative z-10 animate-fadeInUp'>
                                            <div className="relative">
                                            <div className='w-[68px] md:w-[80px] h-[68px] md:h-[80px] border-2 border-[#1c2753] rounded-full flex justify-center items-center bg-white relative'>
                                                <img src="/area-ic.png" alt="Logo" width={30} height={30} className='hidden rounded-full sm:block' />
                                                <img src="/area-ic.png" alt="Logo" width={26} height={26} className='block rounded-xl sm:hidden' />
                                            </div>
                                            <div className="absolute left-1/2 transform -translate-x-1/2 top-[70px] md:top-[75px] text-[#1c2753]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="12,16 8,10 16,10" />
                                                </svg>
                                            </div>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                            <p className='font-bold text-xl'>Searching Your Area</p>
                                            <p className='font-extralight text-sm'>Finding Local Providers</p>
                                            </div>
                                        </div>
                                        )}

                                        {/* Step 3: PROVIDERS */}
                                        {showStep3 && (
                                        <div className='flex items-center mt-8 md:gap-20 gap-10 relative z-10 animate-fadeInUp'>
                                            <div className='w-[68px] md:w-[80px] h-[68px] md:h-[80px] border-2 border-[#1c2753] rounded-full flex justify-center items-center bg-white relative'>
                                            <img src="/plan-ic.png" alt="Logo" width={30} height={30} className='hidden rounded-full sm:block' />
                                            <img src="/plan-ic.png" alt="Logo" width={26} height={26} className='block rounded-xl sm:hidden' />
                                            </div>
                                            <div className='flex flex-col gap-1 justify-start'>
                                            <p className='font-bold text-xl'>Matching Providers</p>
                                            <p className='font-extralight text-sm'>Searching for Licensed</p>
                                            <p className='font-extralight text-sm'>Insurance Agents</p>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                    </div>
                                )}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

const page = () => {
    return (
        <Suspense fallback={<div className="py-10 text-center">Loading confirmation...</div>}>
          <ThankYouPage />
        </Suspense>
    );
}

export default page