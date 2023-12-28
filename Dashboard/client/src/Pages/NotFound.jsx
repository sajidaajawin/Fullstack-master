import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


function NotFound() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
    });
  }, []);

  return (
    <>
    
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center" data-aos="fade-down">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#C08261] dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-[#C08261] md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-[#C08261] dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <a href="/" className="inline-flex text-white bg-[#C08261] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
        </div>
      </div>
    </section>

    </>
  );
}

export default NotFound;