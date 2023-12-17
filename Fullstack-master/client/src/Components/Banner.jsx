import React, { useState } from 'react';

function Banner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const hideBanner = () => {
    setIsBannerVisible(false);
  };

  return (
    <>
      {isBannerVisible && (
        <div className="bg-[#E2C799] text-[#C08261]">
          <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-0 lg:px-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
                <p className="ml-3 text-center font-medium leading-5 sm:text-left">
                  <span className="">
                    <span className="rounded-md bg-[#C08261] px-2 text-white">Save</span> upto 20% with the summer coupons
                  </span>
                </p>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  className="m-2 -mr-1 flex rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={hideBanner}
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
