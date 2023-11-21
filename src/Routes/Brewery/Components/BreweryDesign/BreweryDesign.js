import React, { useEffect } from 'react'
import "./BreweryDesign.css"
import brewery1 from "../../../../Resources/Images/brewery1.png"
import brewery2 from "../../../../Resources/Images/brewery2.png"
import brewery3 from "../../../../Resources/Images/brewery3.png"
import { useTranslation } from 'react-i18next';

const BreweryDesign = () => {
    const { t } = useTranslation();

    const revealItems = () => {
        const shopItems = document.querySelectorAll('.pub-row');
        shopItems.forEach(item => {
            item.classList.add('revealBreweryItem');
        });

    }

    useEffect(() => {
        setTimeout(()=>{
            revealItems();

        },100)
    },[])

  return (
    <div className='pub-design-main'>
    <div className='rows-wrapper'>
        <div className='pub-row'>
            <div className='pub-row-left'>
                <div className='pub-description'>
                    <h1 className='pub-header'>{t('breweryHeader1')}</h1>
                    <p className='pub-paragraph'>{t('breweryParagraph1')}</p>
                </div>
            </div>
            <div className='pub-row-right'>
                <img src={brewery1} alt='Pub' className='pub-img' />
            </div>
        </div>
        <div className='pub-row'>
            <div className='pub-row-left'>
                <img src={brewery2} alt='Food' className='pub-img' />
            </div>
            <div className='pub-row-right'>
                <div className='pub-description'>
                <h1 className='pub-header'>{t('breweryHeader2')}</h1>
                    <p className='pub-paragraph'>{t('breweryParagraph2')}</p>
                </div>
            </div>
        </div>
        <div className='pub-row'>
            <div className='pub-row-left'>
                <div className='pub-description'>
                <h1 className='pub-header'>{t('breweryHeader3')}</h1>
                    <p className='pub-paragraph'>{t('breweryParagraph3')}</p>
                </div>
            </div>
            <div className='pub-row-right'>
                <img src={brewery3} alt='Party' className='pub-img' />
            </div>
        </div>
    </div>
</div>
  )
}

export default BreweryDesign
