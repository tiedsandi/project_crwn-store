import classes from "./cart-item.module.css";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className={classes.cartItemContainer}>
      <img src={imageUrl} alt={name} />
      <div className={classes.itemDetails}>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
