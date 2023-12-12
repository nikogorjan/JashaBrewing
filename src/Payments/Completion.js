import React, { useEffect, useRef, useState } from 'react';
import './Completion.css';
import { useSelector, useDispatch } from 'react-redux';
import { htmlToText } from 'html-to-text';
import Approved from '../Resources/Images/approved.svg'
import { useTranslation } from 'react-i18next';
import Navbar from '../Routes/Navbar/Navbar';
import UserBar from '../Routes/UserBar/UserBar';
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { updatePurchaseComplete, removeAllFromCart,updateSuperComplete } from '../StateManagement/reducers'; // Adjust the import path accordingly
import axios from 'axios';

const Completion = () => {
    const cartData = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const isSentRef = useRef(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [itemsDatabase, setItemsDatabase] = useState(null);

    const sendEmailToServer = async () => {
        try {
            const response = await fetch('https://api.jashabrewing.com/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: cartData.customerEmail,
                    subject: 'Potrdilo plačila',
                    text: 'Hvala za vaš nakup. V priponki vam pošiljamo podatke vašega naročila.',
                    cartData,
                }),
            });

            if (response.ok) {
                console.log('Email to server sent successfully');
            } else {
                console.error('Error sending email to server:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending email to server:', error);
        }
    };

    const sendEmailToAdmin = async () => {
        try {
            const response = await fetch('https://api.jashabrewing.com/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'info@jashabrewing.com',
                    subject: 'Nov nakup',
                    text: `Prejeli ste novo naročilo.`,
                    cartData,
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

    const getItemsData = async () => {
        try {
            const response = await axios.get('https://api.jashabrewing.com/ItemsData');
            setItemsDatabase(response.data);
        } catch (error) {
            console.error('Error fetching AdminData:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getItemsData();
        };
        fetchData();
    }, []);



    const postItemsEnote = async (itemsDatabase) => {
        try {
            const response = await axios.post('https://api.jashabrewing.com/update-items-enote', {
                itemsDatabase,
            });

            if (response.status === 200) {
                console.log('Items enote updated successfully');
            } else {
                console.error('Error updating items enote:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating items enote:', error);
        }
    };

    const checkAndSendEmail = async (itemsDatabase) => {
        try {
            const response = await axios.post('https://api.jashabrewing.com/check-and-send-email', {
                itemsDatabase,
            });

            if (response.status === 200) {
                console.log('Emails sent successfully');
            } else {
                console.error('Error sending emails:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    };

    const calculateEnoteSum = (cartItems, itemsDatabase) => {
        const enoteSumMap = {};

        // Loop through cartItems
        cartItems.forEach((cartItem) => {
            // Check if quantity is a valid number
            if (!isNaN(cartItem.quantity)) {
                // Calculate enote sum for the current item
                const enoteSum = cartItem.quantity * parseFloat(cartItem.cena.enote);

                // Check if the result is a valid number (not NaN)
                if (!isNaN(enoteSum)) {
                    // Check if the item already exists in enoteSumMap
                    if (enoteSumMap[cartItem.ime]) {
                        // If it exists, add the enoteSum to the existing value
                        enoteSumMap[cartItem.ime] += enoteSum;
                    } else {
                        // If it doesn't exist, create a new entry in enoteSumMap
                        enoteSumMap[cartItem.ime] = enoteSum;
                    }
                }
            }
        });

        // Iterate through itemsDatabase and update enote values based on enoteSumMap
        itemsDatabase.forEach((item) => {
            const enoteSum = enoteSumMap[item.ime];

            if (enoteSum) {
                // If enoteSum exists, decrease the item's enote by the enoteSum amount
                item.enote = (parseFloat(item.enote) - enoteSum).toString();
            }
        });

        return enoteSumMap;
    };

    const updateEnotesInItemsDatabase = (cartItems, itemsDatabase) => {

        // Iterate through cartItems
        cartItems.forEach((cartItem) => {
            // Find the corresponding item in itemsDatabase by name
            const matchingItem = itemsDatabase.find((item) => item.ime === cartItem.ime);

            // Check if a matching item is found and its enoteSkupaj is 1
            if (matchingItem && matchingItem.enoteSkupaj === 1) {
                // Calculate the enoteSum for the current cartItem
                const enoteSum = parseFloat(cartItem.cena.enote) * cartItem.quantity;

                // Find the index of the matching item in itemsDatabase
                const index = itemsDatabase.findIndex((item) => item.ime === cartItem.ime);

                // Update the enote value in itemsDatabase
                if (!isNaN(enoteSum)) {
                    itemsDatabase[index].enote = (parseFloat(itemsDatabase[index].enote) - enoteSum).toString();
                }
            } else {
                // Case when enoteSkupaj is 0
                const cenaParts = matchingItem.cena.split('|');
                const updatedCenaParts = cenaParts.map((part) => {
                    const [pakiranje, cena, enote, zaloga] = part.split(';');

                    if (cartItem.cena.name === pakiranje) {
                        // Decrease pakiranje for the amount of cartItem.quantity * cartItem.cena.enote
                        const enoteSum = parseFloat(enote) * cartItem.quantity;
                        const newZaloga = parseFloat(zaloga) - enoteSum;

                        return `${pakiranje};${cena};${enote};${newZaloga}`;
                    }

                    return part;
                });

                // Update cena in itemsDatabase
                matchingItem.cena = updatedCenaParts.join('|');



            }
        });

        
    };

   useEffect(() => {
        if (cartData && itemsDatabase) {
            if (cartData.superComplete !== cartData.superID) {
                updateEnotesInItemsDatabase(cartData.cartItems, itemsDatabase)

            postItemsEnote(itemsDatabase);
            checkAndSendEmail(itemsDatabase)
            dispatch(updateSuperComplete(cartData.superID));
            dispatch(removeAllFromCart());

            }else {
                console.log("")
            }
            

        }
    }, [cartData, itemsDatabase]);

    



    useEffect(() => {
        if (cartData.purchaseComplete !== cartData.purchaseID) {
            
            if (!isSentRef.current) {
                sendEmailToServer();
                sendEmailToAdmin();
                sendCustomerData();
                isSentRef.current = true;

                
                

                dispatch(updatePurchaseComplete(cartData.purchaseID));

            }
        } else {
            console.log("")
        }


    }, [cartData, itemsDatabase, dispatch]);



    const backtostore = () => {
        navigate("/shop")
    }

    const calculateTotalPrice = () => {
        return cartData.cartItems.reduce((total, item) => {
            return total + item.quantity * item.cena.price;
        }, 0) + cartData.shippingCost / 100;
    };

    const sendCustomerData = async () => {
        const totalPrice = calculateTotalPrice();

        try {
            const response = await fetch('https://api.jashabrewing.com/update-customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: cartData.customerEmail,
                    name: cartData.customerName,
                    surname: cartData.customerSurname,
                    phone: cartData.customerPhone,
                    price: totalPrice,
                }),
            });

            if (response.ok) {
                console.log('Customer data sent successfully');
            } else {
                console.error('Error sending customer data:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending customer data:', error);
        }
    };





    return (
        <>
            <Navbar />
            <UserBar />
            <div className='completion-main'>
                <div className='completion-wrapper'>
                    <div className='approved-img-wrapper'>
                        <img src={Approved} alt='check' className='approve-badge' />
                    </div>
                    <h1 className='completed-header'>{t('potrjeno')}</h1>
                    <p className='completed-paragraph'>{t('epotrjeno')}</p>
                    <button className='backstorebutton' onClick={backtostore}>{t('backshop')}</button>
                </div>
            </div>
        </>
    );
};

export default Completion;