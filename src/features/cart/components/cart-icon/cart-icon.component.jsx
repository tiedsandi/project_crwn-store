import ShoppingIcon from "../../../../assets/shopping-bag.svg";
import classes from "./cart-icon.module.css";
import { useState } from "react";

const CartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = 2;

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
    console.log(isCartOpen);
  };

  return (
    <div className={classes.cartIconContainer} onClick={toggleIsCartOpen}>
      <img src={ShoppingIcon} className="shopping-icon" alt="cart" />
      <span className={classes.itemCount}>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
