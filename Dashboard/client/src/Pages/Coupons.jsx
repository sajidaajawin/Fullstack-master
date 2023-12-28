// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Statics from "./Statics";

// function Coupons() {
//   const [coupons, setCoupons] = useState([]);
//   const [limit, setlimit] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setCurrentPage] = useState(1);
//   const [pageNumber, setPageNumber] = useState(1);

//   const tableStyles = {
//     overflowX: "auto",
//   };
//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/getCouponspagi/${page}/${limit}`
//         );
//         // setCoupons(response.data);
//         const { totalPages, pagination } = response.data;

//         const result = response.data.result.rows;
//         setCoupons(result);
//         setTotalPages(totalPages);
//         setlimit(response.data.limit);
//         console.log("result", result);
//         console.log("totalPages", totalPages);
//         console.log("pagination", pagination);
//         console.log("limit", limit);
//       } catch (error) {
//         console.error("Error fetching coupons:", error);
//       }
//     };

//     fetchCoupons();
//   }, [page, limit]);
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleDeleteCopun = async (id) => {
//     try {
//       await axios.put(`http://localhost:8000/DeleteCoupon/${id}`, coupons);

//       Swal.fire({
//         icon: "success",
//         title: "coupons Deleted",
//         text: "The coupons was deleted successfully.",
//         confirmButtonColor: "#C08261",
//       });
//     } catch (error) {
//       console.error("Error deleting coupons:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred while deleting the coupons.",
//         confirmButtonColor: "#B31312",
//       });
//     }
//   };

//   return (
//     <>
//       <Statics />

//       <h2 className="text-3xl font-bold pt-[7rem] text-center mb-4">
//         Latest Coupons
//       </h2>
//       <div className="px-4">
//         <div className="overflow-hidden   mx-auto my-8   rounded-lg border border-[#C08261] shadow-md">
//           <div className="table-container" style={tableStyles}>
//             <table className=" text-center w-full border-collapse bg-white text-left text-sm text-gray-500  ">
//               <thead className="bg-[#C08261]">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-4  text-start font-medium text-gray-900"
//                   >
//                     Code
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-center font-medium text-gray-900"
//                   >
//                     Discount_Percentage Holder{" "}
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-4 text-center   font-medium text-gray-900"
//                   >
//                     Created_At
//                   </th>

//                   <th
//                     scope="col"
//                     className="px-6 py-4  text-center font-medium text-gray-900"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//                 {(coupons ?? []).map((coupon, index) => (
//                   <tr
//                     key={coupon.id}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE] text-center"
//                     }`}
//                   >
//                     <th className="flex gap-3 px-6 py-4   font-normal text-gray-900">
//                       <div className="text-sm ">
//                         <div className="font-medium text-gray-700">
//                           {coupon.code}
//                         </div>
//                       </div>
//                     </th>

//                     <td className="px-6 py-4">
//                       <div className="text-sm">
//                         <div className="font-medium  text-gray-700">
//                           {coupon.discount_percentage}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm">
//                         <div className="font-medium text-gray-700">
//                           {coupon.created_at}
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-6 py-4 ">
//                       <div className="flex justify-center gap-4">
//                         <button
//                           className="text-grey-500 px-4 py-2 rounded"
//                           onClick={() => handleDeleteCopun(coupon.id)}
//                         >
//                           {/* Delete SVG icon */}
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth="1.5"
//                             stroke="currentColor"
//                             className="h-6 w-6"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                             />
//                           </svg>
//                           {/* End Delete SVG icon */}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-center mt-4">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`mx-2 px-4 py-2 rounded ${
//                   pageNumber === index + 1
//                     ? "bg-[#C08261] text-white"
//                     : "bg-white text-[#C08261] border border-[#C08261]"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Coupons;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Statics from "./Statics";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [limit, setlimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code:null,
    discount_Percentage: 0,
  });

  const tableStyles = {
    overflowX: "auto",
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getCouponspagi/${page}/${limit}`
        );

        const { totalPages, pagination } = response.data;

        const result = response.data.result.rows;
        setCoupons(result);
        setTotalPages(totalPages);
        setlimit(response.data.limit);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteCopun = async (id) => {
    try {
      await axios.put(`http://localhost:8000/DeleteCoupon/${id}`, coupons);

      Swal.fire({
        icon: "success",
        title: "coupons Deleted",
        text: "The coupons was deleted successfully.",
        confirmButtonColor: "#C08261",
      });
    } catch (error) {
      console.error("Error deleting coupons:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the coupons.",
        confirmButtonColor: "#B31312",
      });
    }
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Form submitted!", formData);
  //   setShowForm(false);
  // };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/createCoupon",
        formData
      );

      // setCoupons((prevCoupons) => [...prevCoupons, response.data]);
      // setShowForm(false);
      // setFormData({
      //   code: "",
      //   discountPercentage: 0,
      // });

      Swal.fire({
        icon: "success",
        title: "Coupon Created",
        text: "The coupon was created successfully.",
        confirmButtonColor: "#C08261",
      });
    } catch (error) {
      console.error("Error creating coupon:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the coupon.",
        confirmButtonColor: "#B31312",
      });
    }
  };

  return (
    <>
      <Statics />

      <h2 className="text-3xl font-bold pt-[7rem] text-center text-[#C08261] mb-4">
        Latest Coupons
      </h2>
      {/* Button to toggle form visibility */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 rounded bg-[#C08261] text-white"
        >
          Add Coupon
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <button
              onClick={handleButtonClick}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="couponCode"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Coupon Code:
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter coupon code"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="discountPercentage"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Discount Percentage:
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter discount percentage"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#C08261] hover:bg-[#E2C799] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="px-4">
        <div className="overflow-hidden mx-auto my-8 rounded-lg border border-[#C08261] shadow-md">
          <div className="table-container" style={tableStyles}>
            <table className="text-center w-full border-collapse bg-white text-sm text-gray-500">
              {/* Table Header */}
              <thead className="bg-[#C08261]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-start font-medium text-gray-900"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-gray-900"
                  >
                    Discount_Percentage Holder
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-gray-900"
                  >
                    Created_At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-medium text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {(coupons ?? []).map((coupon, index) => (
                  <tr
                    key={coupon.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 !== 0 ? "bg-white" : "bg-[#F7F1EE] text-center"
                    }`}
                  >
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm ">
                        <div className="font-medium text-gray-700">
                          {coupon.code}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium  text-gray-700">
                          {coupon.discount_percentage}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {coupon.created_at}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex justify-center gap-4">
                        <button
                          className="text-grey-500 px-4 py-2 rounded"
                          onClick={() => handleDeleteCopun(coupon.id)}
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
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-4 py-2 rounded ${
                  pageNumber === index + 1
                    ? "bg-[#C08261] text-white"
                    : "bg-white text-[#C08261] border border-[#C08261]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupons;
