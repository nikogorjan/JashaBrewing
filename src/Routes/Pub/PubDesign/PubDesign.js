import React, { useEffect } from 'react'
import './PubDesign.css'
import pub from '../../../Resources/Images/pubcut.png'
import food from '../../../Resources/Images/fingercut.png'
import party from '../../../Resources/Images/partycut.png'
import { useTranslation } from 'react-i18next';

const PubDesign = () => {
    const { t } = useTranslation();

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
    },[])

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
                        <img src={pub} alt='Pub' className='pub-img' />
                    </div>
                </div>
                <div className='pub-row'>
                    <div className='pub-row-left'>
                        <img src={food} alt='Food' className='pub-img' />
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
                        <img src={party} alt='Party' className='pub-img' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PubDesign
