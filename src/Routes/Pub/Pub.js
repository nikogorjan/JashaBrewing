import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pub.css'
import { Helmet } from 'react-helmet-async'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import PubDesign from './PubDesign/PubDesign'
import Footer from '../Footer/Footer'

const Pub = () => {
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
    <div className='pub-main'>
      <Helmet>
        <title>Pub</title>
        <link rel='canonical' href='/Pub'></link>
        <meta name='description' content="Explore our pub's offerings: delicious foods, refreshing drinks, and exciting parties."></meta>
      </Helmet>

      <UserBar/>
      <Navbar/>

      <PubDesign/>
      <Footer/>
    </div>
  )
}

export default Pub
