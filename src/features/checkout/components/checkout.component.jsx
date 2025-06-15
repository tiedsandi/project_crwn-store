import {
  selectCartItems,
  selectCartTotal,
} from "@/features/cart/cart.selectors";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/UI/button/button.component";
import CheckoutItem from "./checkout-item/checkout-item.component";
import Spinner from "@/components/UI/spinner/Spinner.component";
import { clearCart } from "@/features/cart/cartSlice";
import { createTransaction } from "../services/checkout-firebase";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import styles from "./checkout.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!currentUser) return navigate("/auth");

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await createTransaction({
        user: currentUser,
        cartItems,
        total: cartTotal,
      });

      dispatch(clearCart());
      navigate("/checkout/success");
    } catch (err) {
      alert("Checkout failed.", { err });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isProcessing ? (
        <Spinner />
      ) : (
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutHeader}>
            <div className={styles.headerBlock}>
              <span>Product</span>
            </div>
            <div className={styles.headerBlock}>
              <span>Description</span>
            </div>
            <div className={styles.headerBlock}>
              <span>Quantity</span>
            </div>
            <div className={styles.headerBlock}>
              <span>Price</span>
            </div>
            <div className={styles.headerBlock}>
              <span>Remove</span>
            </div>
          </div>

          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}

          <span className={styles.total}>Total: ${cartTotal}</span>

          {cartItems.length > 0 && (
            <div>
              <Button onClick={handleCheckout} disabled={isProcessing}>
                Proceed to Transaction
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
