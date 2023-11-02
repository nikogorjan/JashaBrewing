import React from 'react'
import './Brewery.css'
import { Helmet } from 'react-helmet-async'
import UserBar from '../UserBar/UserBar'
import Navbar from '../Navbar/Navbar'

const Brewery = () => {
    return (
        <div>
            <Helmet>
                <title>Brewery</title>
                <link rel='canonical' href='/Brewery'></link>
                <meta name='description' content="Explore our brewery's craft beer and brewing process."></meta>
            </Helmet>

            <UserBar />
            <Navbar />
        </div>
    )
}

export default Brewery