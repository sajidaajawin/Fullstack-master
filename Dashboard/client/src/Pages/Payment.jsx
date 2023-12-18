import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Payment() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/payments');
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${paymentId}`);
      setSearchResults((prevResults) =>
        prevResults.filter((payment) => payment.payment_id !== paymentId)
      );
      Swal.fire({
        icon: 'success',
        title: 'Payment Deleted',
        text: 'The payment was deleted successfully.',
        confirmButtonColor: '#C08261', 
      });
      
    } catch (error) {
      console.error('Error deleting payment:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the payment.',
        confirmButtonColor: '#B31312', 
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5 ml-80">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-[#C08261]">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Card Holder   </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
             Amount 
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
      Country
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {(searchResults ?? []).map((payment, index) => (
            <tr
              key={payment.payment_id}
              className={`hover:bg-gray-50 ${
                index % 2 !== 0 ? 'bg-white' : 'bg-[#F7F1EE]'
              }`}
            >
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                {/* <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full object-cover object-center"
                    src=""
                    alt=""
                  />
                </div> */}
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {payment.email}
                  </div>
                </div>
              </th>
              
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {payment.cardholder}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {payment.amount}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{payment.country}</td>
              <td className="px-6 py-4 ">
                <div className="flex justify-end gap-4">
                  <button
                    className="text-grey-500 px-4 py-2 rounded"
                    onClick={() => handleDeletePayment(payment.payment_id)}
                  >
                    {/* Delete SVG icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    {/* End Delete SVG icon */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;
