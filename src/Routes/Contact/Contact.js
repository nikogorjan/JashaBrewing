import React from 'react'
import './Contact.css'
import { Helmet } from 'react-helmet-async'
import UserBar from '../UserBar/UserBar'
import Navbar from '../Navbar/Navbar'
import ContactDesign from './Components/ContactDesign/ContactDesign'

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Contact</title>
        <link rel='canonical' href='/Contact'></link>
        <meta name='description' content="Get in touch with us. We'd love to hear from you and assist with your questions or inquiries."></meta>
      </Helmet>

      <UserBar/>
      <Navbar/>

      <ContactDesign/>
    </div>
  )
}

export default Contact
