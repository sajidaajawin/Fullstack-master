import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Card({ id, product_name, product, price, image, key }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items from local storage
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        // Fetch data from your API
        const response = await axios.get(
          `https://localhost:8000/products/${id}`
        );
        // Log the data array specifically
        console.log("API Data:", response.data);

        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        // Set loading to false on error
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // const handleAddToCartClick = () => {
  //   try {
  //     // Add the item to the cart in local storage
  //     const newProduct = { id,product_name, product, price, image };
  //     const newCart = [...cart, newProduct];
  //     setCart(newCart);
  //     localStorage.setItem('cart', JSON.stringify(newCart));

  //     // Optional: You can provide feedback to the user here
  //     console.log('Item added to cart:', newProduct);
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error);
  //   }
  // };

  const handleAddToCartClick = async (id) => {
    // const count = quantity;
    axios.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
      "token"
    )}`;

    await axios
      .post(`http://localhost:8000/items`, { product_id: id ,quantity:quantity })
      .then((response) => {
        Swal("Done!", "Product has been added to cart", "success");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        Swal("Error", "Failed to add product to cart", "error");
      });
  };
  const handleAddToWishlist = async (id) => {
    // const count = quantity;
    axios.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
      "token"
    )}`;

    await axios
      .post(`http://localhost:8000/AddWishlist`, { product_id: id })
      .then((response) => {
        Swal("Done!", "Product has been added to Wishlist", "success");
      })
      .catch((error) => {
        console.error("Error adding product to Wishlist:", error);
        Swal("Error", "Failed to add product to Wishlist", "error");
      });
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mb-6" data-aos="fade-up">
        <div className="relative">
          <img src={image} className="h-72 w-72" alt="Card Image" />
          <div className="absolute top-3 right-3">
            <button
              onClick={() => handleAddToWishlist(id)}
              title="Add to Favorites"
              className="text-2xl text-black-300 hover:text-red-500 duration-300"
            >
              &hearts;
            </button>
          </div>
        </div>
    

        <div className="px-4 py-3 w-72">
        <Link to={`/details/${id}`}>
          <p className="text-lg font-medium text-black truncate block capitalize">
            {product}
          </p>
          </Link>
          <p className="text-sm text-gray-500 mb-2">{product_name}</p>
          <div className="flex items-center">
            <p className="text-lg font-medium text-black cursor-auto my-3">
              {price} JOD
            </p>
            <div className="ml-auto z-50">
              <button onClick={() => handleAddToCartClick(id)}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Card;
