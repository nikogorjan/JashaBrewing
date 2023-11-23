import React, { useEffect } from 'react'
import './Cart.css'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { removeFromCart, incrementQuantity, decrementQuantity,updateShippingCost  } from '../../StateManagement/reducers'; // Import your removeFromCart action
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const Cart = () => {
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux store
  const dispatch = useDispatch(); // Get the dispatch function from useDispatch
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shipping data
    axios.get("http://localhost:3000/ShippingData")
      .then(response => {
        // Update shipping cost in Redux state
        const shippingCost = response.data[0].value * 100; // Convert to cents
        dispatch(updateShippingCost(shippingCost));
      })
      .catch(error => {
        console.error('Error fetching shipping data:', error);
      });
  }, [dispatch]);


  const handleRemoveItem = (ime, cenaIndex) => {
    // Dispatch the removeFromCart action with the item's ime and cenaIndex
    dispatch(removeFromCart({ ime, cenaIndex }));
  };

  const handleIncrementQuantity = (ime, cenaIndex) => {
    // Dispatch the incrementQuantity action with the item's ime and cenaIndex
    dispatch(incrementQuantity({ ime, cenaIndex }));
  };

  const handleDecrementQuantity = (ime, cenaIndex) => {
    // Dispatch the incrementQuantity action with the item's ime and cenaIndex
    dispatch(decrementQuantity({ ime, cenaIndex }));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.cena.price) * item.quantity;
    return total + itemPrice;
  }, 0);

  const goToCheckout = () => {
    navigate('/Checkout');
}

  return (
    <div className='cart-main'>
      <Navbar />
      <UserBar />

      <div className='kosarica-content'>
        <h1 className='kosarica-header'>{t('cart')}</h1>
        <div className='kosarica-items'>
          {cartItems.map((item, index) => (
            <div key={index} className='cart-item'>

              <div className='cart-row-first'>
                <div className='navigation-pointer'></div>
                <div className='items-image-wrapper'>
                  <img src={item.image} className='redux-image' />
                </div>
              </div>

              <p>{item.ime}</p>
              <p>{item.cena.name}</p>
              <div className='reducers-div'>
                <p className='minus' onClick={() => handleDecrementQuantity(item.ime, item.cenaIndex)}>-</p>
                <p className='quantity-div'>{item.quantity}</p>
                <p className='plus' onClick={() => handleIncrementQuantity(item.ime, item.cenaIndex)}>+</p>
              </div>
              <p>{(parseFloat(item.cena.price) * item.quantity).toFixed(2)}€</p>


              <div className='menu-icon4' onClick={() => handleRemoveItem(item.ime, item.cenaIndex)}>
                <div className="menu-bar4 bar1 whitebar"></div>
                <div className="menu-bar4 bar2 whitebar"></div>
              </div>
            </div>
          ))}
        </div>
        <div className='kosarica-items2'>
          {cartItems.map((item, index) => (
            <div key={index} className='cart-item2'>

              <div className='cart-row-first'>
                <div className='item-and-navigator'>
                  <div className='navigation-pointer'></div>
                  <div className='items-image-wrapper'>
                    <img src={item.image} className='redux-image' />
                  </div>
                </div>
                <div className='the-info'>
                  <p className='mobile-info'>{item.ime}</p>
                  <p className='mobile-info'>{item.cena.name}</p>
                  <div className='reducers-div'>
                    <p className='minus' onClick={() => handleDecrementQuantity(item.ime, item.cenaIndex)}>-</p>
                    <p className='quantity-div'>{item.quantity}</p>
                    <p className='plus' onClick={() => handleIncrementQuantity(item.ime, item.cenaIndex)}>+</p>
                  </div>
                  <p className='mobile-info'>{(parseFloat(item.cena.price) * item.quantity).toFixed(2)}€</p>

                </div>
              </div>



              <div className='menu-icon4' onClick={() => handleRemoveItem(item.ime, item.cenaIndex)}>
                <div className="menu-bar4 bar1 whitebar"></div>
                <div className="menu-bar4 bar2 whitebar"></div>
              </div>
            </div>
          ))}
        </div>
        <div className='cart-separator'></div>
        <div className='final-price-div'>
          <div className='cart-row-first'>
            <div className='navigation-pointer'></div>
            <div className='placilo-div'>
              {t('finalprice')}
            </div>
          </div>
          <div className='final-price'>{totalPrice.toFixed(2)}€</div>
        </div>
        <button className='add-to-cart-button cart-button' onClick={goToCheckout}>{t('checkoutButtonText')}</button>

      </div>
    </div>
  )
}

export default Cart
