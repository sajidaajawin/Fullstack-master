import React from 'react';
import Hero from '../Components/Hero';
import Nav from '../Components/Nav';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import Courses from '../Components/Courses';
import Benifts from '../Components/Benifts';
import Blogs from '../Components/Blogs';
import Banner from '../Components/Banner'




const Home = () => {
  return (
    <div>
      <Nav />
  <Banner />
      <Hero />
      <Benifts />
      <Cards />
      < Courses />
 
      < Blogs />
      < Footer />
    </div>
  );
};

export default Home;
