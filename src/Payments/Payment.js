import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import CheckoutForm from "./CheckoutForm";
import './Payment.css'
import { useSelector } from 'react-redux';

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(1220); // Set a default amount or get it dynamically
    const cart = useSelector((state) => state.cart.cartItems);
    const shippingCost = useSelector((state) => state.cart.shippingCost);

    useEffect(() => {
        fetch("http://localhost:3000/config").then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));

        });
    }, []);

    useEffect(() => {
        // Calculate the total amount from the cart items and add shipping cost in cents
        const totalAmountInCents = cart.reduce((total, item) => {
            const itemPriceInCents = Math.round(parseFloat(item.cena.price) * 100);
            return total + itemPriceInCents * item.quantity;
        }, 0);

        // Update the total amount by adding the shipping cost
        const totalAmountWithShipping = totalAmountInCents + shippingCost;

        fetch("http://localhost:3000/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount: totalAmountWithShipping }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (result) => {
            const { clientSecret } = await result.json();
            setClientSecret(clientSecret);
        });
    }, [cart, shippingCost]);

    return (
        <div className="stripe-form">
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Payment
