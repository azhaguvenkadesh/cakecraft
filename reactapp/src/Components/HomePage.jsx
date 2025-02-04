import React from 'react';
import './HomePage.css'; // Import your custom styles
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import BakerNavbar from '../BakerComponents/BakerNavbar';

const HomePage = () => {
  return (
    <div className="wrapper">
      <BakerNavbar />
      <div className="coverimage">
        <LazyLoadImage
          effect="blur"
          src={process.env.PUBLIC_URL + '/cakecraftcoverimage.jpeg'} 
          alt="Cover" 
        />
        <div className="title">CakeCraft</div>
      </div>

      <div className="content">
        <p>Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!</p>
      </div>

      <div className="contact">
        <h2>Contact Us</h2>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
};

export default HomePage;