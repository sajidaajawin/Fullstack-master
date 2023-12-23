import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = localStorage.getItem("userId"); // Fetch user ID from local storage
        // const response = await axios.get(`http://localhost:8000/getworkshop_bookingsId/${userId}`);
        // setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
      <div className="flex flex-wrap justify-center items-center min-h-screen p-4 sm:p-8">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-40 object-cover"
                  src={workshop.workshop_img}
                  alt=""
                />
              </a>
              <div className="p-4">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {workshop.workshop_title}
                  </h5>
                </a>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {workshop.workshop_dis}
                </p>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {workshop.booking_date}
                </p>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {workshop.booking_time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default Workshops;
