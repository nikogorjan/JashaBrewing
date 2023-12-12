import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import './Payment.css'
import { Button } from '@stripe/ui-extension-sdk/ui';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    const textboxes = useSelector((state) => state.cart);
    const { t } = useTranslation();

    const beforeSubmit = (e) => {
        e.preventDefault();

        const formComplete =
        textboxes.customerPhone.trim() !== '' &&
        textboxes.customerName.trim() !== '' &&
        textboxes.customerSurname.trim() !== '' &&
        textboxes.customerUlica.trim() !== '' &&
        textboxes.customerPost.trim() !== '' &&
        textboxes.customerCity.trim() !== '' &&
        textboxes.customerEmail.trim() !== '' &&
        textboxes.confirmEmail.trim() !== '';

        const emailMatch = textboxes.customerEmail.trim() === textboxes.confirmEmail.trim();

        const nestrinjanje =textboxes.pogoji;


        if(formComplete){
            if(emailMatch){
                if(nestrinjanje===false){
                    setMessage("Strinjati se morate s pogoji poslovanja.");

                }else{
                    handleSubmit(e);
                }
                
            }else{
                setMessage("E-naslova se ne ujemata");
            }
            
        }else{
            setMessage("Prosimo izpolnite vse vaše podatke");
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/completion`,
            },
        });

        

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };



    
    return (
        <form id="payment-form" onSubmit={beforeSubmit}>
            <PaymentElement id="payment-element" />
            <Button css={{ width: 'fill', alignX: 'center' }} type="primary" disabled={isProcessing || !stripe || !elements} id="submit" className="stripe-button">
                <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckoutForm
