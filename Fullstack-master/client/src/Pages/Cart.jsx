import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { useOrder } from "../OrderContext/OrderContext";
import Counter from "../Components/Counter";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const { cartData, setOrderData } = useOrder();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProduct(storedCart);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = ` ${localStorage.getItem("token")}`;
        const response = await axios.get("http://localhost:8000/getitems");
        setTotal(response.data);
      } catch (error) {
        console.error("An error occurred during data fetch:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProduct));
  }, [cartProduct]);

  const handleQuantityChange = (productId, quantityChange) => {
    setCartProduct((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + quantityChange);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
  
      return updatedCart;
    });
  };
  
  const handleCheckout = () => {
    setOrderData(total);
  };

  return (
    <>
      <Nav />
      <section className="flex items-center bg-stone-200 lg:h-full font-poppins dark:bg-gray-700">
        <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div className="p-8 bg-gray-50 dark:bg-gray-800">
            <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Your Cart</h2>
            <div className="flex flex-wrap -mx-4">
            {total.map((product) => (
  <div
    className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
    key={product.product_id}
  >
    <img src={product.product_img} alt="" className="w-full h-96 md:h-24 md:w-24 object-cover" />
    <div className="w-2/3 px-4">
      <h2 className="mb-2 text-xl font-bold dark:text-gray-400">{product.product_name}</h2>
      {/* <p className="text-gray-500 dark:text-gray-400 ">{product.product_description}</p> */}
    </div>
    <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
      <div className="inline-flex items-center px-4 font-semibold ">
      <Counter />
       
      </div>
    </div>
    <div className="w-auto flex justify-end px-4 text-right md:w-1/6 lg:w-2/12 ">
      <p className="text-lg font-bold dark:text-gray-400">{product.price}</p>
    </div>
  </div>
))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/payment">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="group inline-flex w-full items-center justify-center rounded-md bg-[#C08261]  px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow "
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
