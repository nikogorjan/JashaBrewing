import React, { useState, useEffect } from 'react'
import './UserBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useTranslation } from 'react-i18next';
import { faSquareFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const UserBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        if(isMenuOpen===false){
            setIsMenuOpen(!isMenuOpen);
        }
        else{
            dissapear();
            setTimeout(()=>{
                setIsMenuOpen(!isMenuOpen);
            },1000)
        }
    };


    useEffect(() => {
        if (isMenuOpen) {
            setTimeout(() => {
                document.querySelector('.link1').classList.add('reveal2');
            }, 100);

            setTimeout(() => {
                document.querySelector('.link2').classList.add('reveal2');
            }, 200);

            setTimeout(() => {
                document.querySelector('.link3').classList.add('reveal2');
            }, 300);

            setTimeout(() => {
                document.querySelector('.link4').classList.add('reveal2');
            }, 400);

            setTimeout(() => {
                document.querySelector('.language-and-socials2').classList.add('reveal2');
            }, 500);
        }


    }, [isMenuOpen]);

    const dissapear = () => {
        setTimeout(() => {
            document.querySelector('.link1').classList.remove('reveal2');
        }, 400);

        setTimeout(() => {
            document.querySelector('.link2').classList.remove('reveal2');
        }, 300);

        setTimeout(() => {
            document.querySelector('.link3').classList.remove('reveal2');
        }, 200);

        setTimeout(() => {
            document.querySelector('.link4').classList.remove('reveal2');
        }, 100);

        setTimeout(() => {
            document.querySelector('.language-and-socials2').classList.remove('reveal2');
        }, 0);
    }

    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Change the language
    };

    const goToShop = () => {
        toggleMenu();
        setTimeout(()=>{
            navigate('/Shop');
        },1100);
    }

    const goToPub = () => {
        toggleMenu();
        setTimeout(()=>{
            navigate('/Pub');
        },1100);
    }

    const goToBrewery = () => {
        toggleMenu();
        setTimeout(()=>{
            navigate('/Brewery');
        },1100);
    }

    const goToContact = () => {
        toggleMenu();
        setTimeout(()=>{
            navigate('/Contact');
        },1100);
    }

    return (
        <div className={`user-bar-main ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className='menu-icon' onClick={toggleMenu}>
                <div className={`menu-bar ${isMenuOpen ? 'bar1' : ''}`}></div>
                <div className={`menu-bar ${isMenuOpen ? 'bar2' : ''}`}></div>
            </div>
            <div className='user-menu'>
                <div className='user-wrapper'>
                    <FontAwesomeIcon icon={faUser} className='user-icons' />
                </div>

                <div className='cart-wrapper'>
                    <FontAwesomeIcon icon={faShoppingCart} className='user-icons' />
                    <div className='red-circle'>0</div>
                </div>
            </div>
            {isMenuOpen && <div className='overflowing-div'>
                <div className='openmenu-wrapper'>
                    <Link className='nav-link-open link1' onClick={goToShop}>{t('shop')}</Link>
                    <Link className='nav-link-open link2' onClick={goToPub}>{t('pub')}</Link>
                    <Link className='nav-link-open link3' onClick={goToBrewery}>{t('brewery')}</Link>
                    <Link className='nav-link-open link4' onClick={goToContact}>{t('contact')}</Link>
                </div>
                <div className='language-and-socials2'>
                    <div className='language-wrapper2'>
                        <p className='language slol' onClick={() => changeLanguage('sl')}>SLO</p>
                        <div className='navigation-pointer'></div>
                        <p className='language engl' onClick={() => changeLanguage('en')}>ENG</p>
                    </div>
                    <div className='socials-wrapper'>
                        <FontAwesomeIcon
                            icon={faSquareFacebook}
                            className='social-icon'
                        />
                        <FontAwesomeIcon icon={faInstagram} className='social-icon insta-margin' />
                    </div>
                </div>
            </div>}
            {!isMenuOpen && (
                <div
                    className='overflowing-div fade-out'
                    onAnimationEnd={() => {
                        // After the fade-out animation ends, remove the div
                        // or hide it as needed.
                    }}
                />
            )}


        </div>
    );
};

export default UserBar;
