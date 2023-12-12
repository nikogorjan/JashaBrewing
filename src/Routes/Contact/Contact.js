import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css'
import { Helmet } from 'react-helmet-async'
import UserBar from '../UserBar/UserBar'
import Navbar from '../Navbar/Navbar'
import ContactDesign from './Components/ContactDesign/ContactDesign'
import Footer from '../Footer/Footer'

const Contact = () => {
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
    <div>
      <Helmet>
        <title>Contact</title>
        <link rel='canonical' href='/Contact'></link>
        <meta name='description' content="Get in touch with us. We'd love to hear from you and assist with your questions or inquiries."></meta>
      </Helmet>

      <UserBar />
      <Navbar />

      <ContactDesign />
      <Footer />
    </div>
  )
}

export default Contact
