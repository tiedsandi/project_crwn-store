import CheckoutItem from "./checkout-item/checkout-item.component";
import styles from "./checkout.module.css";

export default function Checkout() {
  const cartItems = [
    {
      id: 1,
      name: "Sneakers Pro X",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1658527158664-560225dc9aa8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 120,
      quantity: 2,
    },
    {
      id: 2,
      name: "Urban Hoodie",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1658527158664-560225dc9aa8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 75,
      quantity: 1,
    },
    {
      id: 3,
      name: "Classic Backpack",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1658527158664-560225dc9aa8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 45,
      quantity: 3,
    },
    {
      id: 4,
      name: "Digital Watch",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1658527158664-560225dc9aa8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 90,
      quantity: 1,
    },
  ];

  const cartTotal = 1000;

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

      {/* <PaymentForm /> */}
    </div>
  );
}
