import React, { useState } from 'react';
import axios from 'axios';

function Otp() {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');
  
  const [error, setError] = useState('');

  const handleVerification = async (e) => {
    e.preventDefault();

    const fullOtp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

    try {
      const response = await axios.post('http://localhost:8000/verificationCode', { verificationCode: fullOtp });
      console.log(response.data)
      if (response.data) {
        window.location.href = '/newpassword';
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('An error occurred while verifying OTP.');
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#C08261] py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-[#C08261]">
                <p>Email Verification</p>
              </div>
            </div>
  
            <div>
              <form>
                <div className="flex flex-col  space-y-8">
                  <div className="flex flex-row  items-center justify-between mx-auto w-full max-w-xs">
                    <input
                      className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                      type="text"
                      value={otp1}
                      onChange={(e) => setOtp1(e.target.value)}
                    />
                    <input
                      className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                      type="text"
                      value={otp2}
                      onChange={(e) => setOtp2(e.target.value)}
                    />
                    <input
                      className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                      type="text"
                      value={otp3}
                      onChange={(e) => setOtp3(e.target.value)}
                    />
                    <input
                      className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                      type="text"
                      value={otp4}
                      onChange={(e) => setOtp4(e.target.value)}
                    />
                    <input
                      className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                      type="text"
                      value={otp5}
                      onChange={(e) => setOtp5(e.target.value)}
                    />
                    <input
                      className="w-16 h-16 text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#C08261]"
                      type="text"
                      value={otp6}
                      onChange={(e) => setOtp6(e.target.value)}
                    />
                  </div>
  
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        onClick={handleVerification}
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#C08261] border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;
