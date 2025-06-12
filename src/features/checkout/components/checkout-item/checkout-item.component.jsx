import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "@/features/cart/cartSlice";

import styles from "./checkout-item.module.css";
import { useDispatch } from "react-redux";

export default function CheckoutItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <div className={styles.checkoutItemContainer}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} />
      </div>
      <span className={styles.baseSpan}>{name}</span>
      <span className={`${styles.baseSpan} ${styles.quantity}`}>
        <div className={styles.arrow} onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className={styles.value}>{quantity}</span>
        <div className={styles.arrow} onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className={styles.baseSpan}>{price}</span>
      <div className={styles.removeButton} onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
}
