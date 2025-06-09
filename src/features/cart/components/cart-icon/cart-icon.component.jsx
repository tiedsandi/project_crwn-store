import { useDispatch, useSelector } from "react-redux";

import ShoppingIcon from "@/assets/shopping-bag.svg";
import classes from "./cart-icon.module.css";
import { selectCartCount } from "../../cart.selectors";
import { toggleCart } from "../../cartSlice";

const CartIcon = () => {
  const disaptch = useDispatch();

  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => {
    disaptch(toggleCart());
  };

  return (
    <div className={classes.cartIconContainer} onClick={toggleIsCartOpen}>
      <img src={ShoppingIcon} className="shopping-icon" alt="cart" />
      <span className={classes.itemCount}>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
