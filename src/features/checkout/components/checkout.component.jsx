import {
  selectCartItems,
  selectCartTotal,
} from "@/features/cart/cart.selectors";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/UI/button/button.component";
import CheckoutItem from "./checkout-item/checkout-item.component";
import { clearCart } from "@/features/cart/cartSlice";
import { createTransaction } from "../services/checkout-firebase";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import styles from "./checkout.module.css";
import { useNavigate } from "react-router";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const handleCheckout = async () => {
    if (!currentUser) return navigate("/auth");

    try {
      await createTransaction({
        user: currentUser,
        cartItems,
        total: cartTotal,
      });
      dispatch(clearCart());
      navigate("/checkout");
    } catch (err) {
      alert("Checkout gagal.", { err });
    }
  };

  return (
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
          <Button onClick={handleCheckout}>Proceed to Transaction</Button>
        </div>
      )}
    </div>
  );
}
