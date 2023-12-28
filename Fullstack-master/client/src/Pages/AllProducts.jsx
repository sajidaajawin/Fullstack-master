// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Pagination from "../Components/CustomPagination";
// // import Card from "../Components/Card";
// // import Nav from "../Components/Nav";
// // import Footer from "../Components/Footer";

// // const AllProducts = () => {
// //   const [products, setProducts] = useState([]);
// //   const [pageNumber, setPageNumber] = useState(0);
// //   const productsPerPage = 10;
// //   const [selectedCategory, setSelectedCategory] = useState(5);
// //   const [sortOption, setSortOption] = useState("default");
// //   const [searchInput, setSearchInput] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);

// //   const fetchData = async () => {
// //     try {
// //       let response;
// //       if (selectedCategory === 5) {
// //         response = await axios.get("http://localhost:8000/products");
// //       } else {
// //         response = await axios.get(
// //           `http://localhost:8000/product/${selectedCategory}`
// //         );
// //       }
// //       setProducts(response.data);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [selectedCategory]);

// //   const filteredBySearch = searchInput
// //     ? products.filter((product) =>
// //         product.product_name.toLowerCase().includes(searchInput.toLowerCase())
// //       )
// //     : products;

// //   const sortedProducts = [...filteredBySearch];
// //   if (sortOption === "priceLowToHigh") {
// //     sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
// //   } else if (sortOption === "priceHighToLow") {
// //     sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
// //   } else if (sortOption === "topRated") {
// //     // Implement top-rated sorting logic if needed
// //     sortedProducts.sort(
// //       (a, b) => parseFloat(b.product_rating) - parseFloat(a.product_rating)
// //     );
// //   }

// //   const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
// //   const displayedProducts = sortedProducts.slice(
// //     pageNumber * productsPerPage,
// //     (pageNumber + 1) * productsPerPage
// //   );

// //   const handlePageClick = ({ selected }) => {
// //     setPageNumber(selected);
// //   };

// //   const handleCategoryChange = (category) => {
// //     setSelectedCategory(category);
// //   };

// //   const handleSortChange = (option) => {
// //     setSortOption(option);
// //   };

// //   return (
// //     <>
// //       <Nav />
// //       <div className="lg:mx-32">
// //         <form>
// //           <div className="flex">
// //             <label
// //               htmlFor="search-dropdown"
// //               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
// //             >
// //               Your Email
// //             </label>
// //             {/* <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// //     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
// //  </svg></button> */}
// //             {/* Dropdown for selecting categories */}
// //             <div
// //               id="dropdown"
// //               className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
// //             >
// //               <ul
// //                 className="py-2 text-sm text-gray-700 dark:text-gray-200"
// //                 aria-labelledby="dropdown-button"
// //               >
// //                 {[
// //                   { name: "All", id: 5 },
// //                   { name: "Clothes", id: 1 },
// //                   { name: "Accessories", id: 2 },
// //                   { name: "Handmade", id: 3 },
// //                   { name: "Food", id: 4 },
// //                 ].map((category) => (
// //                   <li key={category.id}>
// //                     <button
// //                       type="button"
// //                       className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
// //                       onClick={() => handleCategoryChange(category.id)}
// //                     >
// //                       {category.name}
// //                     </button>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <div className="relative mt-16 w-full">
// //               <input
// //                 type="search"
// //                 id="search-dropdown"
// //                 className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-[#C08261] "
// //                 placeholder="Search For Something"
// //                 required
// //                 onChange={(e) => setSearchInput(e.target.value)}
// //               />
// //               <button
// //                 type="submit"
// //                 className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#C08261]  rounded-e-lg border border-[#C08261]  hover:bg-[#E2C799] "
// //               >
// //                 <svg
// //                   className="w-4 h-4"
// //                   aria-hidden="true"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   viewBox="0 0 20 20"
// //                 >
// //                   <path
// //                     stroke="currentColor"
// //                     stroke-linecap="round"
// //                     stroke-linejoin="round"
// //                     stroke-width="2"
// //                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
// //                   />
// //                 </svg>
// //                 <span className="sr-only">Search</span>
// //               </button>
// //             </div>
// //           </div>
// //         </form>

// //         <div className="flex mt-10 mx-20 justify-between">
// //           <div className="mb-0">
// //             <div className="flex space-x-4">
// //               {[
// //                 { name: "All", id: 5 },
// //                 { name: "Clothes", id: 1 },
// //                 { name: "Accesories", id: 2 },
// //                 { name: "Handmade", id: 3 },
// //                 { name: "Food", id: 4 },
// //               ].map((category) => (
// //                 <button
// //                   key={category.id}
// //                   className={`border px-4 py-2 rounded-lg ${
// //                     selectedCategory === category.id
// //                       ? "bg-[#C08261] "
// //                       : "border-[#C08261] "
// //                   }`}
// //                   onClick={() => handleCategoryChange(category.id)}
// //                 >
// //                   {category.name}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //           <div className="mb-0 ">
// //             <label className="block text-sm font-medium text-gray-700 border border-[#C08261] ">
// //               <select
// //                 value={sortOption}
// //                 onChange={(e) => handleSortChange(e.target.value)}
// //                 className="mt-1 block w-full p-2 border rounded-md"
// //               >
// //                 <option value="default">Default</option>
// //                 <option value="priceLowToHigh">Price: Low to High</option>
// //                 <option value="priceHighToLow">Price: High to Low</option>
// //                 <option value="topRated">Top Rated</option>
// //               </select>
// //             </label>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
// //           {displayedProducts.map((product) => (
// //             <Card
// //               key={product.product_id}
// //               id={product.product_id}
// //               product={product.product_name}
// //               price={product.price}
// //               image={product.product_img}
// //             />
// //           ))}
// //         </div>

// //         <Pagination
// //           currentPage={pageNumber}
// //           totalPages={pageCount}
// //           onPageChange={handlePageClick}
// //         />
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };
// // export default AllProducts;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Pagination from "../Components/CustomPagination";
// import Card from "../Components/Card";
// import Nav from "../Components/Nav";
// import Footer from "../Components/Footer";

// const AllProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);
//   const productsPerPage = 15;
//   const [selectedCategory, setSelectedCategory] = useState(5);
//   const [sortOption, setSortOption] = useState("default");
//   const [searchInput, setSearchInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchData = async () => {
//     try {
//       let response;
//       if (selectedCategory === 5) {
//         response = await axios.get("http://localhost:8000/products");
//       } else {
//         response = await axios.get(
//           `http://localhost:8000/product/${selectedCategory}`
//         );
//       }
//       setProducts(response.data);
//       setTotalPages(Math.ceil(response.data.length / productsPerPage));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [selectedCategory]);

//   const filteredBySearch = searchInput
//     ? products.filter((product) =>
//         product.product_name.toLowerCase().includes(searchInput.toLowerCase())
//       )
//     : products;

//   const sortedProducts = [...filteredBySearch];
//   if (sortOption === "priceLowToHigh") {
//     sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//   } else if (sortOption === "priceHighToLow") {
//     sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//   } else if (sortOption === "topRated") {
//     // Implement top-rated sorting logic if needed
//   }

//   const displayedProducts = sortedProducts.slice(
//     pageNumber * productsPerPage,
//     (pageNumber + 1) * productsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     setPageNumber(newPage - 1);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//   };
//   return (
//     <>
//       <Nav />
//       <div className="lg:mx-32">
//         <form>
//           <div className="flex">
//             <label
//               htmlFor="search-dropdown"
//               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//             >
//               Your Email
//             </label>
//             {/* <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
//  </svg></button> */}
//             {/* Dropdown for selecting categories */}
//             <div
//               id="dropdown"
//               className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
//             >
//               <ul
//                 className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                 aria-labelledby="dropdown-button"
//               >
//                 {[
//                   { name: "All", id: 5 },
//                   { name: "Clothes", id: 1 },
//                   { name: "Accessories", id: 2 },
//                   { name: "Handmade", id: 3 },
//                   { name: "Food", id: 4 },
//                 ].map((category) => (
//                   <li key={category.id}>
//                     <button
//                       type="button"
//                       className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       onClick={() => handleCategoryChange(category.id)}
//                     >
//                       {category.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="relative mt-16 w-full">
//               <input
//                 type="search"
//                 id="search-dropdown"
//                 className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-[#C08261] "
//                 placeholder="Search For Something"
//                 required
//                 onChange={(e) => setSearchInput(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#C08261]  rounded-e-lg border border-[#C08261]  hover:bg-[#E2C799] "
//               >
//                 <svg
//                   className="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//                 <span className="sr-only">Search</span>
//               </button>
//             </div>
//           </div>
//         </form>

//         <div className="flex mt-10 mx-20 justify-between">
//           <div className="mb-0">
//             <div className="flex space-x-4">
//               {[
//                 { name: "All", id: 5 },
//                 { name: "Clothes", id: 1 },
//                 { name: "Accesories", id: 2 },
//                 { name: "Handmade", id: 3 },
//                 { name: "Food", id: 4 },
//               ].map((category) => (
//                 <button
//                   key={category.id}
//                   className={`border px-4 py-2 rounded-lg ${
//                     selectedCategory === category.id
//                       ? "bg-[#C08261] "
//                       : "border-[#C08261] "
//                   }`}
//                   onClick={() => handleCategoryChange(category.id)}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="mb-0 ">
//             <label className="block text-sm font-medium text-gray-700 border border-[#C08261] ">
//               <select
//                 value={sortOption}
//                 onChange={(e) => handleSortChange(e.target.value)}
//                 className="mt-1 block w-full p-2 border rounded-md"
//               >
//                 <option value="default">Default</option>
//                 <option value="priceLowToHigh">Price: Low to High</option>
//                 <option value="priceHighToLow">Price: High to Low</option>
//                 <option value="topRated">Top Rated</option>
//               </select>
//             </label>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//           {displayedProducts.map((product) => (
//             <Card
//               key={product.product_id}
//               id={product.product_id}
//               product={product.product_name}
//               price={product.price}
//               image={product.product_img}
//             />
//           ))}
//         </div>

//         <Pagination
//           totalPages={totalPages}
//           currentPage={pageNumber + 1}
//           onPageChange={handlePageChange}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };
// export default AllProducts;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Components/CustomPagination";
import Card from "../Components/Card";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import SearchResults from "./SearchResults";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 15;
  const [selectedCategory, setSelectedCategory] = useState(5);
  const [sortOption, setSortOption] = useState("default");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      let response;
      if (selectedCategory === 5) {
        response = await axios.get("http://localhost:8000/products");
      } else {
        response = await axios.get(
          `http://localhost:8000/product/${selectedCategory}`
        );
      }
      setProducts(response.data);
      setTotalPages(Math.ceil(response.data.length / productsPerPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const filteredBySearch = searchInput
    ? products.filter((product) =>
        product.product_name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : products;

  const sortedProducts = [...filteredBySearch];
  if (sortOption === "priceLowToHigh") {
    sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === "priceHighToLow") {
    sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === "topRated") {
  }
  const displayedProducts = sortedProducts.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handlePageChange = (newPage) => {
    setPageNumber(newPage - 1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchInput);
  };

  return (
    <>
      <Nav />
      <div className="lg:mx-32">
        <form className="mt-8" onSubmit={handleSearchSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#C08261] focus:border-[#C08261]"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-[#C08261] hover:bg-[#E2C799] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#C08261] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
           <div className="flex flex-col sm:flex-row mt-10 mx-4 sm:mx-20 justify-between">
  <div className="mb-4 sm:mb-0">
    <div className="flex space-x-2 sm:space-x-4">
      {[
        { name: "All", id: 5 },
        { name: "Clothes", id: 1 },
        { name: "Accessories", id: 2 },
        { name: "Handmade", id: 3 },
        { name: "Food", id: 4 },
      ].map((category) => (
        <button
          key={category.id}
          className={`border px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
            selectedCategory === category.id
              ? "bg-[#C08261] "
              : "border-[#C08261] "
          }`}
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>


              <div className="mb-0 ">
                <label className="block text-sm font-medium text-gray-700 border border-[#C08261] ">
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                  >
                    <option value="default">Default</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="topRated">Top Rated</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {displayedProducts.map((product) => (
                <Card
                  key={product.product_id}
                  id={product.product_id}
                  product={product.product_name}
                  price={product.price}
                  image={product.product_img}
                />
              ))}
            </div>
            <SearchResults displayedProducts={displayedProducts} />

            <Pagination
              totalPages={totalPages}
              currentPage={pageNumber + 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
export default AllProducts;
