import React, { useState } from 'react'
import './Checkout.css'
import Navbar from '../Navbar/Navbar'
import UserBar from '../UserBar/UserBar'
import { useTranslation } from 'react-i18next';
import { CountryDropdown } from 'react-country-region-selector';

const Checkout = () => {
    const { t } = useTranslation();
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerSurname, setCustomerSurname] = useState('');
    const [customerStreet, setCustomerStreet] = useState('');
    const [customerPosta, setCustomerPosta] = useState('');
    const [customerMesto, setCustomerMesto] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    const [country, setCountry] = useState('Slovenia');


    const handleCountryChange = (val) => {
        setCountry(val);
    };


    const handleCustomerChange = (event) => {
        setCustomerPhone(event.target.value);
    };

    const handleNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setCustomerSurname(event.target.value);
    };

    const handleStreetChange = (event) => {
        setCustomerStreet(event.target.value);
    };

    const handleMestoChange = (event) => {
        setCustomerMesto(event.target.value);
    };

    const handlePostaChange = (event) => {
        setCustomerPosta(event.target.value);
    };

    const handleEmailChange = (event) => {
        setCustomerEmail(event.target.value);
    };


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
                                            type='text'
                                            id='customerName'
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
                                                    id='customerName'
                                                    value={customerSurname}
                                                    onChange={handleSurnameChange}
                                                    required
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
                    <div className='checkout-right'></div>
                </div>
            </div>

        </div>
    )
}

export default Checkout
