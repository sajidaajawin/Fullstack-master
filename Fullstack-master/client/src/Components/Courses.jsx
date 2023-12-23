import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import Swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS file

const Courses = () => {
  const [workshops, setWorkshops] = useState([]);
  const [showAllWorkshops, setShowAllWorkshops] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init(); // Initialize AOS

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllShop");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedworkshop = showAllWorkshops ? workshops : workshops.slice(0, 4);

  const handleReadMoreClick = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClick = async () => {
    closeModal();

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // User is logged in, proceed with seat-saving logic
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(
          "http://localhost:8000/Newworkshop_bookings",
          selectedWorkshop
        );

        if (response.data) {
          // Show success alert for registered users
          Swal({
            icon: "success",
            title: "Success!",
            text: "Your seat has been successfully saved!",
          });
        }
      } catch (error) {
        console.error("Error saving seat:", error);
      }
    } else {
      // User is not logged in, show modal with login/signup options
      Swal({
        icon: "warning",
        title: "You're not logged in!",
        text: "To save your seat, please sign up or log in.",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        cancelButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to the sign-up page
          navigate("/signup");
        } else if (
          result.dismiss === "cancel" ||
          result.dismiss === Swal.DismissReason.cancel
        ) {
          // Redirect to the login page
          navigate("/login");
        }
      });
    }
  };

  useEffect(() => {
    AOS.refresh(); // Refresh AOS when component updates
  });

  return (
    <>
    <h1 className="mt-16 flex justify-center font-bold text-4xl   text-[#C08261]"> Our Latest Workshops</h1>
    <div
      className="flex flex-wrap justify-center items-center min-h-screen p-4 sm:p-8"
      data-aos="fade-up" // Set the AOS animation attribute
      data-aos-offset="200" // Optional: Set the offset
      data-aos-duration="1000" // Optional: Set the duration
    >
      {displayedworkshop.map((workshop) => (
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
                {workshop.workshop_end}
              </p>
              {localStorage.getItem("token") ? (
                <a
                  onClick={handleConfirmClick}
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#C08261]"
                >
                  Save a seat
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              ) : (
                <a
                  href="#"
                  onClick={() => handleReadMoreClick(workshop)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#C08261]"
                >
                 Log in to save a seat
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                   
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#C08261] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
              <div className="relative z-10">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-[#C08261] grid place-items-center mx-auto">
                  <FiAlertCircle />
                </div>
                <h3 className="text-3xl font-bold text-center mb-2">
                  One more thing!
                </h3>
                <p className="text-center mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  aperiam vitae, sapiente ducimus eveniet in velit.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={closeModal}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Nah, go back
                  </button>
                  <button
                    onClick={handleConfirmClick}
                    className="bg-white hover:opacity-90 transition-opacity text-[#C08261] font-semibold w-full py-2 rounded"
                  >
                    Understood!
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default Courses;
