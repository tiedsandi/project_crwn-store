import Button from "@/components/UI/button/button.component";
import CartItem from "../cart-item/cart-item.component";
import classes from "./cart-dropdown.module.css";
import { selectCartItems } from "../../cart.selectors";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);

  return (
    <div className={classes.cartDropdownContainer}>
      <div className={classes.cartItems}>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className={classes.emptyMessage}>Your cart is empty</span>
        )}
      </div>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
