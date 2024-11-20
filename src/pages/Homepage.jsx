import React from 'react';
import Layout from '../components/Layouts/Layout.jsx';
import Carousel from '../components/Carousel.jsx';
import HomeProduct from './HomeProduct.jsx';
import PromotionalSlider from './PromotionalSlider.jsx';
import "./home.css";
import HomeCate from './HomeCate.jsx';

const Home = () => {
  return (
    <Layout title={"Homepage"}>
      <div className="home-container">







  {/* Categories Section */}
  <h2 className='text-center'></h2>
        <HomeCate   />








        {/* Carousel */}

        <Carousel  className=""/>
        
      
        
        {/* Featured Products Section */}
        <section className="featured-products">
          {/* <h2>Featured Products</h2> */}
          <HomeProduct  />
        </section>
        
        {/* Promotional Section */}
        <section className="promotional-section">
          {/* <h2>Special Offers</h2> */}
          <PromotionalSlider />
        </section>
      </div>
    </Layout>
  );
};

export default Home;