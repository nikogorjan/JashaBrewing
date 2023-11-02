import React, {useEffect} from 'react'
import './Navbar.css'
import logo from '../../Resources/Images/logo-nobg-text.png'
import { Link, useLocation,useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook,faInstagram  } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation(); // Get the current location
    const navigate = useNavigate();

    const displayNavigationPointerShop = location.pathname === '/Shop';
    const displayNavigationPointerPub = location.pathname === '/Pub';
    const displayNavigationPointerBrewery = location.pathname === '/Brewery';
    const displayNavigationPointerContact = location.pathname === '/Contact';

    useEffect(()=>{

        setTimeout(()=>{
            document.querySelector('.navbar-logo-img').classList.add('reveal1');
        },100);


        setTimeout(()=>{
            document.querySelector('.wrapper1').classList.add('reveal1');
        },200);

        setTimeout(()=>{
            document.querySelector('.wrapper2').classList.add('reveal1');
        },300);

        setTimeout(()=>{
            document.querySelector('.wrapper3').classList.add('reveal1');
        },400);

        setTimeout(()=>{
            document.querySelector('.wrapper4').classList.add('reveal1');
        },500);

        setTimeout(()=>{
            document.querySelector('.language-and-socials').classList.add('reveal1');
        },600);

        

    },[]);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Change the language
    };

    const dissapear = () => {
        setTimeout(()=>{
            document.querySelector('.language-and-socials').classList.remove('reveal1');
        },0);

        setTimeout(()=>{
            document.querySelector('.wrapper4').classList.remove('reveal1');
        },100);

        setTimeout(()=>{
            document.querySelector('.wrapper3').classList.remove('reveal1');
        },200);

        setTimeout(()=>{
            document.querySelector('.wrapper2').classList.remove('reveal1');
        },300);

        setTimeout(()=>{
            document.querySelector('.wrapper1').classList.remove('reveal1');
        },400);

        setTimeout(()=>{
            document.querySelector('.navbar-logo-img').classList.remove('reveal1');
        },500);
    }

    const goToShop = () => {
        dissapear();
        setTimeout(()=>{
            navigate('/Shop');
        },1100);
    }

    const goToPub = () => {
        dissapear();
        setTimeout(()=>{
            navigate('/Pub');
        },1100);
    }

    const goToBrewery = () => {
        dissapear();
        setTimeout(()=>{
            navigate('/Brewery');
        },1100);
    }

    const goToContact = () => {
        dissapear();
        setTimeout(()=>{
            navigate('/Contact');
        },1100);
    }

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
                    />
                    <FontAwesomeIcon icon={faInstagram} className='social-icon insta-margin'/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
