import React, { useEffect, useState } from 'react'
import './ShopItems.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../Navbar/Navbar';
import UserBar from '../../UserBar/UserBar';
import NavbarCopy from '../../Navbar/NavbarCopy';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../StateManagement/reducers';
import Footer from '../../Footer/Footer';

const ItemDetail = () => {
    const location = useLocation();
    const { item } = location.state || {};
    const [descriptionMenuIndex, setDescriptionMenuIndex] = useState(0);
    const [menuToggle, setMenuToggle] = useState(false);
    const { t, i18n } = useTranslation();
    const [itemCopy, setItemCopy] = useState(item);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const descriptionMenuToggle = () => {
        console.log(item)
        if (menuToggle === false) {
            setMenuToggle(true);
        } else {
            setMenuToggle(false);
        }
    }

    useEffect(() => {
        
        setItemCopy(item)
    }, [])

    const revealItems = () => {
        const shopItems = document.querySelectorAll('.shop-item');
        shopItems.forEach(item => {
            item.classList.add('revealItem');
        });

    }

    const hidelItems = () => {
        const shopItems = document.querySelectorAll('.shop-item');
        shopItems.forEach(item => {
            item.classList.remove('revealItem');
        });

    }

    const revealDescriptionItems = () => {
        document.querySelector('.description-wrapper').classList.add('revealItemDescription');


    }

    const hideDescriptionItems = () => {
        document.querySelector('.description-wrapper').classList.remove('revealItemDescription');


    }

    const toggleItemDescription = () => {


        hideDescriptionItems()
        setTimeout(() => {
            navigate("/Shop");


        }, 1200)

    }

    useEffect(() => {

        setTimeout(() => {
            revealItems();
            revealDescriptionItems()


        }, 100)
    }, [])

    const handleAddToCart = (item, cenaIndex) => {
        dispatch(addToCart({ ime: item.ime, cenaIndex, item }));

        document.querySelector('.item-added-div').classList.add("show-added-item-div");

        setTimeout(() => {
            document.querySelector('.item-added-div').classList.remove("show-added-item-div");

        }, 1000)

    };

    const handleClick = () => {
        hideDescriptionItems();
        setTimeout(() => {
            window.scrollTo({ top: 0, });

            navigate('/cart');
        }, 1100);

    };

    return (
        <div>
            <Navbar />
            <UserBar />
            <div className='shop-items-main detail-main'>

                <div className='item-added-div'>
                    ITEM ADDED
                    <div className='progress-bar'></div>
                </div>

                <div className='shop-items-wrapper'>
                    <div className='description-wrapper'>
                        <div className='item-description-left'>
                            <img src={itemCopy?.Image} alt={itemCopy?.ime} className='shop-item-img-description' />
                            {itemCopy.popust !== "0" && <div className='description-popust'>-{itemCopy?.popust}%</div>}
                            {itemCopy.navoljo === 0 && <div className='description-navoljo'>{t('nizaloge')}</div>}

                        </div>

                        <div className='item-description-right'>
                            <div className='descriptions-wrapper'>
                                <p className='description-paragraph1'>{itemCopy?.ime} / {itemCopy?.podnaslov}</p>
                                <p className='description-paragraph2'>
                                    {i18n.language === 'sl' ? itemCopy?.opisslo : itemCopy?.opiseng}
                                </p>


                                <div className='beer-drop-down' onClick={descriptionMenuToggle}>
                                    <div className='drop-down-row'>
                                        <div className='dropdown-title'>{itemCopy?.cena[descriptionMenuIndex].name}</div>
                                        <div className='drop-down-arrow'>
                                            <i className="arrow down"></i>
                                        </div>
                                    </div>

                                    <div className={`drop-down-menu2 ${menuToggle === true ? 'show-dropdown' : ''}`}>
                                        {itemCopy?.cena.map((item, subIndex) => (
                                            <div key={subIndex} onClick={() => setDescriptionMenuIndex(subIndex)}>
                                                <p className='item-name'>{item.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className='beer-price'>{itemCopy?.cena[descriptionMenuIndex].price}€</p>

                                <button className='add-to-cart-button width-button' onClick={() => handleAddToCart(item, descriptionMenuIndex)} disabled={itemCopy.navoljo === 0}>{t('addCart')}</button>

                                <div className='description-buttons-row'>
                                    <div className='hover-left' onClick={() => { toggleItemDescription(null) }}>
                                        <div class="arrow-left" ></div>
                                        <p className='row-paragraph'>{t('continue')}</p>
                                    </div>
                                    <div className='navigation-pointer description-pointer'></div>
                                    <div className='hover-right' onClick={handleClick}>
                                        <p className='row-paragraph'>{t('checkout')}</p>
                                        <div class="arrow-right" ></div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ItemDetail
