import React, { useEffect, useState } from 'react'
import './PubDesign.css'
import pub from '../../../Resources/Images/pubcut.png'
import food from '../../../Resources/Images/fingercut.png'
import party from '../../../Resources/Images/partycut.png'
import { useTranslation } from 'react-i18next';
import { Buffer } from 'buffer';
import axios from 'axios';

const PubDesign = () => {
    const { t } = useTranslation();
    const [pubImage1, setPubImage1] = useState();
    const [pubImage2, setPubImage2] = useState();
    const [pubImage3, setPubImage3] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pubImagesResponse = await axios.get('https://api.jashabrewing.com/PubData');

                if (pubImagesResponse.data && pubImagesResponse.data.length > 0) {
                    const [pubImageData] = pubImagesResponse.data;
    
                    // Convert blob to base64 for each image
                    if (pubImageData.image1) {
                        const base64Image1 = Buffer.from(pubImageData.image1, 'binary').toString('base64');
                        setPubImage1(`data:image/jpeg;base64,${base64Image1}`);
                    }
    
                    if (pubImageData.image2) {
                        const base64Image2 = Buffer.from(pubImageData.image2, 'binary').toString('base64');
                        setPubImage2(`data:image/jpeg;base64,${base64Image2}`);
                    }
    
                    if (pubImageData.image3) {
                        const base64Image3 = Buffer.from(pubImageData.image3, 'binary').toString('base64');
                        setPubImage3(`data:image/jpeg;base64,${base64Image3}`);
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount

    const revealItems = () => {
        const shopItems = document.querySelectorAll('.pub-row');
        shopItems.forEach(item => {
            item.classList.add('revealPubItem');
        });

    }

    useEffect(() => {
        setTimeout(()=>{
            revealItems();

        },100)
    },[pubImage1,pubImage2,pubImage3])

    return (
        <div className='pub-design-main'>
            <div className='rows-wrapper'>
                <div className='pub-row'>
                    <div className='pub-row-left'>
                        <div className='pub-description'>
                            <h1 className='pub-header'>{t('pubheader')}</h1>
                            <p className='pub-paragraph'>{t('pubparagraph')}</p>
                        </div>
                    </div>
                    <div className='pub-row-right'>
                        <img src={pubImage1} alt='Pub' className='pub-img' />
                    </div>
                </div>
                <div className='pub-row'>
                    <div className='pub-row-left'>
                        <img src={pubImage2} alt='Food' className='pub-img' />
                    </div>
                    <div className='pub-row-right'>
                        <div className='pub-description'>
                        <h1 className='pub-header'>{t('foodheader')}</h1>
                            <p className='pub-paragraph'>{t('foodparagraph')}</p>
                        </div>
                    </div>
                </div>
                <div className='pub-row'>
                    <div className='pub-row-left'>
                        <div className='pub-description'>
                        <h1 className='pub-header'>{t('partyheader')}</h1>
                            <p className='pub-paragraph'>{t('partyparagraph')}</p>
                        </div>
                    </div>
                    <div className='pub-row-right'>
                        <img src={pubImage3} alt='Party' className='pub-img' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PubDesign
