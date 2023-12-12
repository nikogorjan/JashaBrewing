import React, { useEffect, useState } from 'react'
import './Cart.css'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { removeFromCart, incrementQuantity, decrementQuantity, updateShippingCost } from '../../StateManagement/reducers'; // Import your removeFromCart action
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import Footer from '../Footer/Footer';

const Cart = () => {
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux store
  const dispatch = useDispatch(); // Get the dispatch function from useDispatch
  const navigate = useNavigate();
  const [itemsDatabase, setItemsDatabase] = useState(null);
  const [shippingTreshold, setshippingTreshold] = useState("0");

  const getItemsData = async () => {
    try {
      const response = await axios.get('https://api.jashabrewing.com/ItemsData');
      setItemsDatabase(response.data);
    } catch (error) {
      console.error('Error fetching AdminData:', error);
    }
  };

  const getShippingTresholdData = async () => {
    try {
      const response = await axios.get('https://api.jashabrewing.com/ShippingTresholdData');
      setshippingTreshold(response.data);
    } catch (error) {
      console.error('Error fetching AdminData:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getItemsData();
      await getShippingTresholdData();
    };
    fetchData();
  }, []);

  const [removedItems, setRemovedItems] = useState([]);

  useEffect(() => {
    
    // Check if both cartItems and itemsDatabase are available
    if (cartItems && itemsDatabase) {
      // Create an object to store enoteSum for each unique item name
      const enoteSumMap = {};

      // Loop through cartItems
      cartItems.forEach((cartItem) => {
        // Find the corresponding item in itemsDatabase by name
        const matchingItem = itemsDatabase.find((item) => item.ime === cartItem.ime);

        // Check if a matching item is found and its navoljo is 0
        if (matchingItem && matchingItem.navoljo === 0) {
          // Use handleRemoveItem to remove the item from the cart
          handleRemoveItem(cartItem.ime, cartItem.cenaIndex);
        }


        if (matchingItem && matchingItem.enoteSkupaj === 1) {
          // Calculate enoteSum for the current cartItem
          const enoteSum = parseFloat(cartItem.cena.enote) * cartItem.quantity;

          // Check if enoteSumMap already has an entry for this item name
          if (enoteSumMap[cartItem.ime]) {
            // If yes, add the enoteSum to the existing sum
            enoteSumMap[cartItem.ime] += enoteSum;
          } else {
            // If no, create a new entry with the current enoteSum
            enoteSumMap[cartItem.ime] = enoteSum;
          }

          

          // Iterate over itemsDatabase
          // Iterate over itemsDatabase
          itemsDatabase.forEach((item) => {
            // Check if the item is in enoteSumMap
            if (enoteSumMap[item.ime]) {
              // Compare enote values
              if (parseFloat(item.enote) < enoteSumMap[item.ime]) {
                // Use handleRemoveItem to remove all items with the same ime from the cart
                const itemsToRemove = cartItems.filter((cartItem) => cartItem.ime === item.ime);
                itemsToRemove.forEach((itemToRemove) => {
                  // Store the removed item information in the array
                  setRemovedItems((prevItems) => [
                    ...prevItems,
                    { ime: itemToRemove.ime, enote: item.enote },
                  ]);

                  handleRemoveItem(itemToRemove.ime, itemToRemove.cenaIndex);
                });
              }
            }
          });
        } else {
          // If matchingItem.enoteSkupaj is not 1
          const calculatedEnote = parseFloat(cartItem.cena.enote) * cartItem.quantity;
          if (calculatedEnote > cartItem.cena.enoteNavoljo) {
            // Use handleRemoveItem to remove the item from the cart
            handleRemoveItem(cartItem.ime, cartItem.cenaIndex);

            // Store the removed item information in the array
            setRemovedItems((prevItems) => [
              ...prevItems,
              { ime: cartItem.ime, enote: cartItem.cena.enoteNavoljo },
            ]);
          }
        }



      });


    }
  }, [cartItems, itemsDatabase]);

  

  const cartTotalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.cena.price) * item.quantity;
    return total + itemPrice;
  }, 0);

  useEffect(() => {
    // Fetch shipping data
    axios.get("https://api.jashabrewing.com/ShippingData")
      .then(response => {
        const shippingCost = response.data[0].value * 100; // Convert to cents

        // Compare cart total with shipping threshold
        if (cartTotalPrice >= parseFloat(shippingTreshold[0].treshold)) {
          // If cart total is greater than or equal to the threshold, update shipping cost to 0
          dispatch(updateShippingCost(0));
        } else {
          // Otherwise, update shipping cost based on the fetched data
          dispatch(updateShippingCost(shippingCost));
        }
      })
      .catch(error => {
        console.error('Error fetching shipping data:', error);
      });
  }, [dispatch, cartTotalPrice, shippingTreshold]);


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

  useEffect(() => {
    const validAge = sessionStorage.getItem('validAge');
    if (validAge !== 'true') {
      // If validAge is not true, redirect the user back to the home page
      navigate('/');
    }
  }, [navigate]);

  // If validAge is not true, do not render the Shop component
  const validAge = sessionStorage.getItem('validAge');
  if (validAge !== 'true') {
    return null; // or return a component indicating the user needs to go back to the home page
  }

  return (
    <>
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


          {removedItems.length > 0 && (
            <div className="removed-items-section">

              {removedItems.map((removedItem, index) => (
                <p key={index} className='removed-items-paragraph'>
                  {`Izdelek ${removedItem.ime} je bil samodejno odstranjen, na voljo samo še ${removedItem.enote} enot`}
                </p>
              ))}
            </div>
          )}




          {shippingTreshold[0].treshold !== "null" && (
            <div className='treshold-row'>
              <p className='shipping-treshold-paragraph'>{t('treshold')}</p>
              <p className='shipping-treshold-paragraph space-left'>{shippingTreshold[0].treshold}€</p>
              <p className='shipping-treshold-paragraph space-left'>{t('brezplacno')}</p>

            </div>
          )}





          <button className='add-to-cart-button cart-button' onClick={goToCheckout}>{t('checkoutButtonText')}</button>

        </div>

      </div>
      <Footer />
    </>
  )
}

export default Cart
