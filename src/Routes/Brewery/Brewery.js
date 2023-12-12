import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Brewery.css'
import { Helmet } from 'react-helmet-async'
import UserBar from '../UserBar/UserBar'
import Navbar from '../Navbar/Navbar'
import BreweryDesign from './Components/BreweryDesign/BreweryDesign'
import Footer from '../Footer/Footer'

const Brewery = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const validAge = sessionStorage.getItem('validAge');
        if (validAge !== 'true') {
            
            navigate('/');
        }
    }, [navigate]);

    // If validAge is not true, do not render the Shop component
    const validAge = sessionStorage.getItem('validAge');
    if (validAge !== 'true') {
        
        return null;

    }
    return (
        <div>
            <Helmet>
                <title>Brewery</title>
                <link rel='canonical' href='/Brewery'></link>
                <meta name='description' content="Explore our brewery's craft beer and brewing process."></meta>
            </Helmet>

            <UserBar />
            <Navbar />

            <BreweryDesign />
            <Footer />
        </div>
    )
}

export default Brewery
