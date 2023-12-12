import React from 'react'
import './TermsOfBusiness.css'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import Footer from '../Footer/Footer'
import { useTranslation } from 'react-i18next';

const TermsOfBusiness = () => {
    const { t } = useTranslation();

    return (
        <div className='terms-main'>
            <Navbar />
            <UserBar />

            <div className='terms-wrapper'>
                <div className='terms-inner-wrapper'>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('pogoji-capital')}</h2>
                        <p className='section-paragraph'>{t('pogoji-opis')}</p>
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('dostopnost-informacij')}</h2>
                        <p className='section-paragraph'>{t('dostopnost-opis')}</p>
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('nacin-placila')}</h2>
                        <p className='section-paragraph'>{t('naslednje')}</p>
                        <p className='section-paragraph'>{t('popovzetju')}</p>
                        <p className='section-paragraph'>{t('skartico')}</p>
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('veljavnost')}</h2>
                        <p className='section-paragraph'>{t('veljavnostp')}</p>
                        <p className='section-paragraph'>{t('veljavnostp1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('vracilo')}</h2>
                        <p className='section-paragraph'>{t('vracilo1')}</p>
                        <p className='section-paragraph'>{t('vracilo2')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('zavrnitev')}</h2>
                        <p className='section-paragraph'>{t('zavrnitev1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('dobava')}</h2>
                        <p className='section-paragraph'>{t('dobava1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('dostavaa')}</h2>
                        <p className='section-paragraph'>{t('dostavaa1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('uporaba')}</h2>
                        <p className='section-paragraph'>{t('uporaba1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('pravica')}</h2>
                        <p className='section-paragraph'>{t('pravica1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('pritozbe')}</h2>
                        <p className='section-paragraph'>{t('pritozbe1')}</p>
                        
                    </div>
                    <div className='section-container'>
                        <h2 className='section-header'>{t('avtorske')}</h2>
                        <p className='section-paragraph'>{t('avtorske1')}</p>
                        
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default TermsOfBusiness
