import React from 'react'
import './Footer.css';
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useTranslation } from 'react-i18next';
import demi from '../../Resources/Images/deminobg.png'

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const openExternalLink = (url) => {
        window.open(url, '_blank');
    };

    const goShop = () => {
        window.scrollTo({ top: 0,  });

        navigate("/Shop")
    };

    const goPub = () => {
        window.scrollTo({ top: 0,  });

        navigate("/Pub")
    };

    const goBrewery = () => {
        window.scrollTo({ top: 0,  });

        navigate("/Brewery")
    };

    const goContact = () => {
        window.scrollTo({ top: 0,  });

        navigate("/Contact")
    };

    const goTerms = () => {
        window.scrollTo({ top: 0,  });

        navigate("/Terms")
    };

    return (
        <div className='footer-main'>
            <div className='footer-wrapper'>
            <div className='navigations-row'>
                <p className='navigation-paragraph' onClick={goShop}>{t('shop')}</p>
                <p className='navigation-paragraph' onClick={goPub}>{t('pub')}</p>
                <p className='navigation-paragraph' onClick={goBrewery}>{t('brewery')}</p>
                <p className='navigation-paragraph' onClick={goContact}>{t('contact')}</p>
            </div>
            <div className='footer-contact-column'>
                <p className='footer-contact-paragraph'>+386 (0)31 240 319</p>
                <p className='footer-contact-paragraph'>info@jashabrewing.com</p>
                <p className='footer-contact-paragraph'>Lendavsko naselje 1, 9000 Murska Sobota Slovenija</p>
            </div>
            <div className='footer-rights-row'>
                <p className='footer-right-paragraph'>Copyright © 2023 JashaBrewing d.o.o.</p>
                <p className='footer-right-paragraph right-separator none-separator'>|</p>
                <p className='footer-right-paragraph right-separator right-clickable' onClick={goTerms}>{t('pogoji')}</p>
                <p className='footer-right-paragraph right-separator none-separator'>|</p>
                <div className='name-hover-color' onClick={() => openExternalLink('http://nikogorjan.com/')}>
                    <p className='footer-right-paragraph right-separator'>{t('izdelal')}</p>
                    <p className='footer-right-paragraph name-clickable'>Niko Gorjan</p>
                    <div className='demi-wrapper'>
                        <img src={demi} className='demi-img' />
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Footer
