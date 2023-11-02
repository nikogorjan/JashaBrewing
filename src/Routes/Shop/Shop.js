import React from 'react';
import './Shop.css';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import UserBar from '../UserBar/UserBar';

const Shop = () => {
  return (
    <div className='shop-main'>
      <Helmet>
        <title>Shop</title>
        <link rel='canonical' href='/Shop'></link>
        <meta name='description' content='Shop for ordering our products.'></meta>
      </Helmet>

      <Navbar/>
      <UserBar/>
      

    </div>
  )
}

export default Shop;