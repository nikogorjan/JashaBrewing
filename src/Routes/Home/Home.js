import React, { useEffect, useState } from 'react';
import './Home.css';
import logo from '../../Resources/Images/logo-nobg.png';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [goShop, setGoShop] = useState(false);
    const [lock, setLock] = useState();

    const getLockData = async () => {
        try {
            const response = await axios.get('https://api.jashabrewing.com/LockData');
            setLock(response.data);

        } catch (error) {
            console.error('Error fetching AdminData:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getLockData();
        };
        fetchData();
    }, []);

    //fadein animacija
    useEffect(()=>{

        const validAge = sessionStorage.getItem('validAge');
            if (validAge === 'true') {
                navigate('/Shop');
            } else {
                setTimeout(()=>{
                    document.querySelector('.logo-img').classList.add('reveal');
                },150);
        
                setTimeout(()=>{
                    document.querySelector('.age-question').classList.add('reveal');
                },300);
        
                setTimeout(()=>{
                    document.querySelector('.answer-da').classList.add('reveal');
                },450);
        
                setTimeout(()=>{
                    document.querySelector('.answer-ne').classList.add('reveal');
                },600);
            }

        

    },[]);

    const goToShop = () => {
        setTimeout(()=>{
            document.querySelector('.logo-img').classList.remove('reveal');
        },450);

        setTimeout(()=>{
            document.querySelector('.age-question').classList.remove('reveal');
        },300);

        setTimeout(()=>{
            document.querySelector('.answer-da').classList.remove('reveal');
        },150);

        setTimeout(()=>{
            document.querySelector('.answer-ne').classList.remove('reveal');
        },0);
        sessionStorage.setItem('validAge', 'true');
        setTimeout(()=>{
            

            setGoShop(true);
        },1450);

    }

    useEffect(()=>{
        if(goShop===true){
            navigate('/Shop');
        }
    },[goShop,navigate]);

    const goToYouTubeKids = () => {
        window.location.href = 'https://www.youtubekids.com/';
    }

    

  return (
    <div className='home-main'>
        <Helmet>
            <title>Jasha Brewing</title>
            <link rel='canonical' href='/'></link>
            <meta name='description' content='JashaBrewing: Craft beer brewery in Murska Sobota, Slovenia.'></meta>
        </Helmet>
        <div className='content-wrapper'>
            <img alt='Logo' src={logo} className='logo-img'/>

            {lock && lock.length > 0 && lock[0].locked === 0 ? (
                    <>
                        <p className='age-question'>{t('greeting')}</p>
                        <div className='answers-row'>
                            <p className='answer-da' onClick={goToShop}>{t('yes')}</p>
                            <p className='answer-ne' onClick={goToYouTubeKids}>{t('no')}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='age-question'>{t('kmalu')}</p>
                        <div className='answers-row'>
                            <p className='answer-da' ></p>
                            <p className='answer-ne'></p>
                        </div>
                    </>
                    
                    
                )}
        </div>
    </div>
  )
}

export default Home