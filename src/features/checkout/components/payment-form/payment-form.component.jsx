import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Button from "@/components/UI/button/button.component";
import { selectCartTotal } from "@/features/cart/cart.selectors";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import styles from "./payment-form.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }),
    });

    const { paymentIntent } = await response.json();
    const clientSecret = paymentIntent.client_secret;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: currentUser?.displayName || "Guest",
        },
      },
    });

    setIsProcessing(false);

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    }
  };

  return (
    <div className={styles.paymentFormContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button
          isLoading={isProcessing}
          buttonType="inverted"
          style={{ marginLeft: "auto", marginTop: "30px" }}
        >
          Pay now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
