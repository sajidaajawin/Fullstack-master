import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init(); // Initialize AOS

    const fetchBlogDetails = async () => {
      try {
        // Fetch data from your API based on the blogId
        const response = await axios.get(`http://localhost:8000/getblog/${blogId}`);

        const data = response.data; // Adjust this based on your API response



        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        // Set loading to false on error
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  useEffect(() => {
    AOS.refresh(); // Refresh AOS when component updates
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#C08261] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div
        className="mx-auto max-w-screen-lg justify-center px-4"
        data-aos="fade-up" // Set the AOS animation attribute
        data-aos-offset="200" // Optional: Set the offset
        data-aos-duration="1000" // Optional: Set the duration
      >
        <div className="my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white">
          <img
            src={blog.blog_img}
            className="h-56 w-full object-cover"
            alt=""
          />
          <div className="flex-auto px-6 py-5">
            <span className="mb-2 flex items-center text-sm font-semibold">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M14.272 10.445L18 2m-8.684 8.632L5 2m7.761 8.048L8.835 2m5.525 0l-1.04 2.5M6 16a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z"
                />
              </svg>
              {blog.created_at}
            </span>
            <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
              {blog.title}
            </h3>
            <p className="mb-4 text-base font-light">{blog.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
