import styles from "./checkout-item.module.css";

export default function CheckoutItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  // const cartItems = [];

  const clearItemHandler = () => console.log("clear");

  const addItemHandler = () => console.log("add");

  const removeItemHandler = () => console.log("remove");

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
