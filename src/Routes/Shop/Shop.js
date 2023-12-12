import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import UserBar from '../UserBar/UserBar';
import ShopItems from './Components/ShopItems';
import Footer from '../Footer/Footer';

const Shop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validAge = sessionStorage.getItem('validAge');
    if (validAge !== 'true') {
      // If validAge is not true, redirect the user back to the home page
      navigate('/');
    }
  }, [navigate]);

  // If validAge is not true, do not render the Shop component
  const validAge = sessionStorage.getItem('validAge');
  if (validAge !== 'true') {
    return null; // or return a component indicating the user needs to go back to the home page
  }

  return (
    <div className='shop-main'>
      <Helmet>
        <title>Shop</title>
        <link rel='canonical' href='/Shop'></link>
        <meta name='description' content='Shop for ordering our products.'></meta>
      </Helmet>

      <Navbar/>
      <UserBar/>
      <ShopItems/>
      


    </div>
  )
}

export default Shop;