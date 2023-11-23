import React, { useEffect, useState } from 'react'
import './Checkout.css'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import { useTranslation } from 'react-i18next';
import { CountryDropdown } from 'react-country-region-selector';
import deliveryIcon from '../../Resources/Images/delivery-icon.png'
import { useSelector, useDispatch } from 'react-redux';
import cashIcon from '../../Resources/Images/cash-icon.png'
import creditCardIcon from '../../Resources/Images/credit-card-icon.png'
import Payment from '../../Payments/Payment';
import { updateShippingCost,updatePlaciloOption,updateCustomerPhone,updateCustomerName,updateCustomerSurname,updateCustomerUlica,updateCustomerPost,updateCustomerCity,updateCustomerEmail  } from '../../StateManagement/reducers'; // Import your removeFromCart action
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom


const Checkout = () => {
    const { t } = useTranslation();
    const cartItems = useSelector((state) => state.cart.cartItems); // Get cart items from Redux store
    const dispatch = useDispatch(); // Get the dispatch function from useDispatch
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerSurname, setCustomerSurname] = useState('');
    const [customerStreet, setCustomerStreet] = useState('');
    const [customerPosta, setCustomerPosta] = useState('');
    const [customerMesto, setCustomerMesto] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerEmailConfirm, setCustomerEmailConfirm] = useState('');

    const [country, setCountry] = useState('Slovenia');
    const shippingCost = useSelector((state) => state.cart.shippingCost); // Get shipping cost from Redux store
    const [shippingVal, setShippingVal] = useState('');
    const [shippingValData, setShippingValData] = useState('');

    const [option1Checked, setOption1Checked] = useState(true); // Initial state for the first checkbox
    const [option2Checked, setOption2Checked] = useState(false); // Initial state for the second checkbox

    const [option3Checked, setOption3Checked] = useState(true); // Initial state for the first checkbox
    const [option4Checked, setOption4Checked] = useState(false); // Initial state for the second checkbox
    const cartData= useSelector((state) => state.cart); // Get cart items from Redux store
    const navigate = useNavigate();
    useEffect(() => {
        if(shippingCost===0){

        }else{
            setShippingVal(shippingCost)
        }
        
      }, [shippingCost]);

      useEffect(() => {
        // Fetch shipping data
        axios.get("http://localhost:3000/ShippingData")
          .then(response => {
            // Update shipping cost in Redux state
            const shippingCost = response.data[0].value * 100; // Convert to cents
            setShippingValData(shippingCost)
            dispatch(updateShippingCost(shippingCost));
          })
          .catch(error => {
            console.error('Error fetching shipping data:', error);
          });
      }, [dispatch]);


    const handleOption1Change = () => {
        setOption1Checked(true);
        setOption2Checked(false);
        const newShippingCost = shippingValData; // Set the desired shipping cost when option1 is checked

        dispatch(updateShippingCost(newShippingCost));
      };
      
      const handleOption2Change = () => {
        setOption1Checked(false);
        setOption2Checked(true);
        const newShippingCost = 0; // Set the desired shipping cost when option2 is checked
        dispatch(updateShippingCost(newShippingCost));
      };

    const handleOption3Change = () => {
        setOption3Checked(true);
        setOption4Checked(false);
        dispatch(updatePlaciloOption('Placilo po povzetju'));

    };

    const handleOption4Change = () => {
        setOption3Checked(false);
        setOption4Checked(true);
        dispatch(updatePlaciloOption('Kreditna kartica'));

    };

    useEffect(()=>{
        if(option3Checked){
            dispatch(updatePlaciloOption('Placilo po povzetju'));

        }else{
            dispatch(updatePlaciloOption('Kreditna kartica'));

        }
    },[])


    const handleCountryChange = (val) => {
        setCountry(val);
    };


    const handleCustomerChange = (event) => {
        setCustomerPhone(event.target.value);
        dispatch(updateCustomerPhone(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handleNameChange = (event) => {
        setCustomerName(event.target.value);
        dispatch(updateCustomerName(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handleSurnameChange = (event) => {
        setCustomerSurname(event.target.value);
        dispatch(updateCustomerSurname(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handleStreetChange = (event) => {
        setCustomerStreet(event.target.value);
        dispatch(updateCustomerUlica(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handleMestoChange = (event) => {
        setCustomerMesto(event.target.value);
        dispatch(updateCustomerCity(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handlePostaChange = (event) => {
        setCustomerPosta(event.target.value);
        dispatch(updateCustomerPost(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handleEmailChange = (event) => {
        setCustomerEmail(event.target.value);
        dispatch(updateCustomerEmail(event.target.value)); // Dispatch the action to update customerPhone

    };

    const handleEmailConfirmChange = (event) => {
        setCustomerEmailConfirm(event.target.value);

    };

    const totalPricee = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.cena.price) * item.quantity;
        return total + itemPrice;
      }, 0);

      const sendEmailToServer = async () => {
        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: cartData.customerEmail, // replace with the recipient's email
                    subject: 'Potrdilo plačila',
                    text: 'Hvala za vaš nakup. V priponki vam pošiljamo podatke vašega naročila.',
                    cartData, // Include cartData separately

                }),
            });

            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Error sending email:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const sendEmailToAdmin = async () => {
        try {


            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'niko.gorjan@gmail.com', // replace with the admin's email
                    subject: 'Nov nakup',
                    text: `Prejeli ste novo naročilo.`, // Include cartData in the email text
                    cartData, // Include cartData separately

                }),
            });

            if (response.ok) {
                console.log('Admin email sent successfully');
            } else {
                console.error('Error sending admin email:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending admin email:', error);
        }
    };

    const buyPoPovzetju=()=>{
        navigate("/completion")
    }


    return (
        <div className='checkout-main'>
            <Navbar />
            <UserBar />

            <div className='checkout-wrapper'>
                <div className='checkout-divider'>
                    <div className='checkout-left'>
                        <div className='customer-data-container'>

                            <h1 className='customers-header'>{t('placnik')}</h1>
                            <div className='country-div'>
                                <label htmlFor='country'>{t('country')}</label>
                                <CountryDropdown
                                    value={country}
                                    onChange={(val) => handleCountryChange(val)}
                                    classes='drop-country'
                                    defaultOptionLabel='Slovenia' // Set Slovenia as the default country
                                />
                            </div>
                            {country === 'Slovenia' ? (
                                <>
                                    <div className='input-container'>
                                        <label htmlFor='customerName'>{t('phone')} *</label>
                                        <input
                                            type='tel'
                                            id='customerPhone'
                                            autoComplete='tel'
                                            value={customerPhone}
                                            onChange={handleCustomerChange}
                                            required
                                        />
                                    </div>
                                    <div className='input-row'>
                                        <div className='input-container2'>
                                            <div className='custom-wrapper1'>
                                                <div className='label-wrapper1'>
                                                    <label htmlFor='customerName'>{t('name')} *</label>
                                                </div>
                                                <input
                                                    type='text'
                                                    id='customerName'
                                                    autoComplete='given-name'
                                                    value={customerName}
                                                    onChange={handleNameChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='input-container2'>
                                            <div className='custom-wrapper2'>
                                                <div className='label-wrapper2'>
                                                    <label htmlFor='customerName'>{t('surname')} *</label>
                                                </div>
                                                <input
                                                    type='text'
                                                    id='customerSurname'
                                                    value={customerSurname}
                                                    onChange={handleSurnameChange}
                                                    required
                                                    autoComplete='family-name'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='input-container'>
                                        <label htmlFor='customerName'>{t('street')} *</label>
                                        <input
                                            type='text'
                                            id='customerName'
                                            value={customerStreet}
                                            onChange={handleStreetChange}
                                            required
                                            autoComplete='street-address'
                                        />
                                    </div>

                                    <div className='input-row'>
                                        <div className='input-container2'>
                                            <div className='custom-wrapper1'>
                                                <div className='label-wrapper1'>
                                                    <label htmlFor='customerName'>{t('postnast')} *</label>
                                                </div>
                                                <input
                                                    type='text'
                                                    id='customerName'
                                                    value={customerPosta}
                                                    onChange={handlePostaChange}
                                                    required
                                                    autoComplete='postal-code'
                                                />
                                            </div>
                                        </div>

                                        <div className='input-container2'>
                                            <div className='custom-wrapper2'>
                                                <div className='label-wrapper2'>
                                                    <label htmlFor='customerName'>{t('mesto')} *</label>
                                                </div>
                                                <input
                                                    type='text'
                                                    id='customerName'
                                                    value={customerMesto}
                                                    onChange={handleMestoChange}
                                                    required
                                                    autoComplete='address-level2'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='input-container'>
                                        <label htmlFor='customerName'>{t('email')} *</label>
                                        <input
                                            type='text'
                                            id='customerName'
                                            value={customerEmail}
                                            onChange={handleEmailChange}
                                            required
                                            autoComplete='email'
                                        />
                                    </div>

                                    <div className='input-container'>
                                        <label htmlFor='customerName'>{t('emailrepeat')} *</label>
                                        <input
                                            type='text'
                                            id='customerName'
                                            value={customerEmailConfirm}
                                            onChange={handleEmailConfirmChange}
                                            required
                                            autoComplete='email'
                                        />
                                    </div>
                                </>
                            ) :
                                <div className='missed-country'>
                                    <p className='error-country'>{t('countryError')} *</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='vertical-divider'></div>
                    <div className='checkout-right'>
                        <div className='narocilo-wrapper'>


                            {country === 'Slovenia' ? (
                                <>
                                    <h1 className='customers-header header2'>{t('narocilo')}</h1>
                        

                                    <p className='dostava-paragraph'>{t('placilo')}</p>

                                    <div className='dostava-option'>
                                        <input
                                            type='checkbox'
                                            id='dostavaOption1'
                                            checked={option3Checked}
                                            onChange={handleOption3Change}
                                        />
                                        <div className='dostava-icon-wrapper'>
                                            <img src={cashIcon} alt='dostava' className='dostava-icon' />
                                        </div>
                                        <p className='dostava-option-paragraph'>{t('povzetje')}</p>
                                    </div>

                                    <div className={`dostava-option ${option4Checked ? '' : ''}`}>
                                        <input
                                            type='checkbox'
                                            id='dostavaOption1'
                                            checked={option4Checked}
                                            onChange={handleOption4Change}
                                        />
                                        <div className='dostava-icon-wrapper'>
                                            <img src={creditCardIcon} alt='dostava' className='dostava-icon' />
                                        </div>
                                        <div className='credit-card-option'>
                                            <p className='dostava-option-paragraph'>{t('creditcard')}</p>
                                        </div>
                                    </div>

                                    <div className='checkout-horizontal-divider'></div>
                                    <div className='partial-znesek'>
                                        <p className='parial-paragraph'>{t('partial')}</p>
                                        <div className='final-price2'>{totalPricee.toFixed(2)}€</div>

                                    </div>
                                    <div className='partial-znesek'>
                                        <p className='parial-paragraph'>{t('dostava')}</p>
                                        <div className='final-price2'>{(shippingCost/100).toFixed(2)}€</div>

                                    </div>
                                    <div className='checkout-horizontal-divider2'></div>

                                    <div className='partial-znesek'>
                                        <p className='parial-paragraph3'>{t('full')}</p>
                                        <div className='final-price3'>{(totalPricee + (shippingCost/100)).toFixed(2)}€</div>

                                    </div>

                                    {option3Checked === true ? (
                                    <button className='buy-button' onClick={buyPoPovzetju}>{t('buy')}</button>

                                    ):(
                                        <Payment/>

                                    )}

                                    
                                </>
                            ) :
                                <div className='missed-country'>
                                    <p className='error-country'>{t('countryError')} *</p>

                                </div>
                            }




                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Checkout
