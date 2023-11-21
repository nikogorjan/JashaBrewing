import React, { useState, useEffect } from 'react'
import './UserBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link from react-router-dom
import { useTranslation } from 'react-i18next';
import { faSquareFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const UserBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    const toggleMenu = () => {
        if (isMenuOpen === false) {
            setIsMenuOpen(!isMenuOpen);
        }
        else {
            dissapear();
            setTimeout(() => {
                setIsMenuOpen(!isMenuOpen);
            }, 1000)
        }
    };

    const closeeMenu = () => {
        if (isMenuOpen === false) {
            setIsMenuOpen(!isMenuOpen);
        }
        else {
            dissapear2()
            setTimeout(() => {
                setIsMenuOpen(!isMenuOpen);
            }, 1000)
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

        document.querySelector('.super-overflow2').classList.add('overdissapear2'); 

    }

    const dissapear2 = () => {
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
        if (location.pathname !== '/Shop') {
            toggleMenu();
            setTimeout(() => {
                window.scrollTo({ top: 0, });
                
                navigate('/Shop');
            }, 1100);
        } else {
            closeeMenu();
        }

    }

    const goToPub = () => {
        if (location.pathname !== '/Pub') {
            toggleMenu();
            setTimeout(() => {
                window.scrollTo({ top: 0, });

                navigate('/Pub');
            }, 1100);
        } else {
            closeeMenu();
        }
    }

    const goToBrewery = () => {
        if (location.pathname !== '/Brewery') {
            toggleMenu();
            setTimeout(() => {
                window.scrollTo({ top: 0, });

                navigate('/Brewery');
            }, 1100);
        } else {
            closeeMenu();
        }
    }

    const goToContact = () => {
        if (location.pathname !== '/Contact') {
            toggleMenu();
            setTimeout(() => {
                window.scrollTo({ top: 0, });

                navigate('/Contact');
            }, 1100);
        } else {
            closeeMenu();
        }
    }

    const handleClick = () => {
        document.querySelector('.super-overflow2').classList.add('overdissapear2'); 
        setTimeout(() => {
            window.scrollTo({ top: 0, });

            navigate('/cart');
                }, 1100);
        
      };


    return (
        <div className={`user-bar-main ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className='menu-icon' onClick={closeeMenu}>
                <div className={`menu-bar ${isMenuOpen ? 'bar1' : ''}`}></div>
                <div className={`menu-bar ${isMenuOpen ? 'bar2' : ''}`}></div>
            </div>
            <div className='user-menu'>
                

                <div className='cart-wrapper' onClick={handleClick}>
                    <FontAwesomeIcon icon={faShoppingCart} className='user-icons' />
                    <div className='red-circle'>{totalQuantity}</div>
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

            <div className='super-overflow2'></div>


        </div>
    );
};

export default UserBar;
