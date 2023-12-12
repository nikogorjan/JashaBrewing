import React, { useEffect } from 'react'
import './Navbar.css'
import logo from '../../Resources/Images/logo-nobg-text.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation(); // Get the current location
    const navigate = useNavigate();

    const displayNavigationPointerShop = location.pathname === '/Shop';
    const displayNavigationPointerPub = location.pathname === '/Pub';
    const displayNavigationPointerBrewery = location.pathname === '/Brewery';
    const displayNavigationPointerContact = location.pathname === '/Contact';

    useEffect(() => {


        setTimeout(() => {
            document.querySelector('.navbar-logo-img').classList.add('reveal1');
        }, 100);


        setTimeout(() => {
            document.querySelector('.wrapper1').classList.add('reveal1');
        }, 200);

        setTimeout(() => {
            document.querySelector('.wrapper2').classList.add('reveal1');
        }, 300);

        setTimeout(() => {
            document.querySelector('.wrapper3').classList.add('reveal1');
        }, 400);

        setTimeout(() => {
            document.querySelector('.wrapper4').classList.add('reveal1');
        }, 500);

        setTimeout(() => {
            document.querySelector('.language-and-socials').classList.add('reveal1');
        }, 600);



    }, []);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Change the language
    };

    const dissapear = () => {
        setTimeout(() => {
            document.querySelector('.language-and-socials').classList.remove('reveal1');
        }, 0);

        setTimeout(() => {
            document.querySelector('.wrapper4').classList.remove('reveal1');
        }, 100);

        setTimeout(() => {
            document.querySelector('.wrapper3').classList.remove('reveal1');
        }, 200);

        setTimeout(() => {
            document.querySelector('.wrapper2').classList.remove('reveal1');
        }, 300);

        setTimeout(() => {
            document.querySelector('.wrapper1').classList.remove('reveal1');
        }, 400);

        setTimeout(() => {
            document.querySelector('.navbar-logo-img').classList.remove('reveal1');
        }, 500);

        document.querySelector('.super-overflow').classList.add('overdissapear');

    }

    const goToShop = () => {
        if (location.pathname !== '/Shop') {
            console.log("go shop")
            dissapear();
            setTimeout(() => {
                window.scrollTo({ top: 0,  });
                navigate('/Shop');

            }, 1100);
        }

    }
 
    const goToPub = () => {
        if (location.pathname !== '/Pub') {
            dissapear();
            setTimeout(() => {
                window.scrollTo({ top: 0,  });

                navigate('/Pub');
            }, 1100);
        }

    }

    const goToBrewery = () => {
        if (location.pathname !== '/Brewery') {
            dissapear();
            setTimeout(() => {
                window.scrollTo({ top: 0,  });

                navigate('/Brewery');
            }, 1100);
        }


    }

    const goToContact = () => {
        if (location.pathname !== '/Contact') {
            dissapear();
            setTimeout(() => {
                window.scrollTo({ top: 0,  });

                navigate('/Contact');
            }, 1100);
        }


    }

    const handleFacebookIconClick = () => {
        const facebookLink = 'https://www.facebook.com/profile.php?id=100069968973291&locale=sl_SI';
        window.open(facebookLink, '_blank');
      };

      const handleInstagramIconClick = () => {
        const facebookLink = 'https://www.instagram.com/jashabrewing/';
        window.open(facebookLink, '_blank');
      };

    return (
        <div className='navbar-main'>
            <div className='logo-holder'>
                <img alt='navbar-logo-img' src={logo} className='navbar-logo-img' />
            </div>
            <div className='navigations-wrapper'>
                <div className='link-wrapper  wrapper1'>
                    <div className='pointer-wrapper'>{displayNavigationPointerShop && <div className='navigation-pointer'></div>}</div>
                    <Link className='nav-link' onClick={goToShop}>{t('shop')}</Link>
                </div>
                <div className='link-wrapper wrapper2'>
                    <div className='pointer-wrapper'>{displayNavigationPointerPub && <div className='navigation-pointer'></div>}</div>
                    <Link className='nav-link' onClick={goToPub}>{t('pub')}</Link>
                </div>
                <div className='link-wrapper wrapper3'>
                    <div className='pointer-wrapper'>{displayNavigationPointerBrewery && <div className='navigation-pointer'></div>}</div>
                    <Link className='nav-link' onClick={goToBrewery}>{t('brewery')}</Link>
                </div>
                <div className='link-wrapper wrapper4'>
                    <div className='pointer-wrapper'>{displayNavigationPointerContact && <div className='navigation-pointer'></div>}</div>
                    <Link className='nav-link' onClick={goToContact}>{t('contact')}</Link>
                </div>
            </div>

            <div className='language-and-socials'>
                <div className='language-wrapper'>
                    <p className='language slol' onClick={() => changeLanguage('sl')}>SLO</p>
                    <div className='navigation-pointer'></div>
                    <p className='language engl' onClick={() => changeLanguage('en')}>ENG</p>
                </div>
                <div className='socials-wrapper'>
                    <FontAwesomeIcon
                        icon={faSquareFacebook}
                        className='social-icon'
                        onClick={handleFacebookIconClick}

                    />
                    <FontAwesomeIcon icon={faInstagram} className='social-icon insta-margin'                         onClick={handleInstagramIconClick}
/>
                </div>
            </div>


            <div className='super-overflow'></div>

        </div>
    )
}

export default Navbar
