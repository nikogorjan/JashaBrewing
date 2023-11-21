import React from 'react'
import './Pub.css'
import { Helmet } from 'react-helmet-async'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import PubDesign from './PubDesign/PubDesign'

const Pub = () => {
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
    </div>
  )
}

export default Pub
