import React, { useEffect } from 'react'
import './Completion.css'
import { useSelector } from 'react-redux'; // Import the useSelector hook from react-redux
import { htmlToText } from 'html-to-text';

const Completion = () => {
    const cartData = useSelector((state) => state.cart); // Get cart items from Redux store

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

    useEffect(() => {
        sendEmailToServer();
        sendEmailToAdmin();
    }, [cartData])


    return (
        <div className='completion-main'>
            <h1 className='completed-header'>COMPLETE</h1>
        </div>
    )
}

export default Completion
