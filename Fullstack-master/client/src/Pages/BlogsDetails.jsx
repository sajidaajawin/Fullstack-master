// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from '../Components/Footer';
// import Nav from '../Components/Nav';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// function BlogsDetails() {
//   const [blogData, setBlogData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const { blogId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/getBlog/${blogId}`);
//         const blogDetails = response.data.result;

//         setBlogData(blogDetails);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data from API:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [blogId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const { created_at, title, blog_img, content } = blogData;

//   return (
//     <>
//     <Nav />
//     return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {blogs.map((blog) => (
//         <Link to={`/blogs/${blog.id}`} key={blog.id}>
//           {/* You can create a BlogCard component for each blog in the list */}
//           <div className="bg-white p-4 rounded shadow-md">
//             <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
//             <p className="text-gray-600">{blog.created_at}</p>
//             <img className="mt-2 h-32 w-full object-cover rounded" src={blog.blog_img} alt="" />
//             <p className="mt-2 text-gray-700">{blog.content.substring(0, 100)}...</p>
//           </div>
//         </Link>
//       ))}
//     </div>
// <Footer />
// </>

//   );
// }

// export default BlogsDetails;
