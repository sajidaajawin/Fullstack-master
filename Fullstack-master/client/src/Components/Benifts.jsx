import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Benifts() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-16 divide-y divide-gray-200 md:flex-row md:divide-x md:divide-y-0">
      <div className="flex max-w-xs h-full space-x-2 p-4 text-[#C08261]" data-aos="fade-up">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <p className="text-[#C08261]">Our handmade products boast individuality, meticulous attention to detail, and a personal touch</p>
      </div>
      <div className="flex max-w-xs h-full space-x-2 p-4 text-[#C08261]" data-aos="fade-up">
        <FontAwesomeIcon icon={faTruck} className="h-12 w-12 text-[#C08261]" />
        <p className="text-[#C08261]">Fastest Delivery directly At Your Door.</p>
      </div>
      <div className="flex max-w-xs h-full space-x-2 p-4 text-[#C08261]" data-aos="fade-up">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-[#C08261]">Unbeatable prices, always! Check out our permanent offers now.</p>
      </div>
    </div>
  );
  }  
export default Benifts;
