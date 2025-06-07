import Button from "../../../UI/button/button.component";
import CartItem from "../cart-item/cart-item.component";
import classes from "./cart-dropdown.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const CartDropdown = () => {
  const cartItems = [
    {
      id: 1,
      name: "Black T-Shirt",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1687294575742-27c7f9fd6935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 25,
      quantity: 2,
    },
    {
      id: 2,
      name: "Blue Jeans",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1687294575742-27c7f9fd6935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 40,
      quantity: 1,
    },
    {
      id: 3,
      name: "Blue Jeans",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1687294575742-27c7f9fd6935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 40,
      quantity: 1,
    },
    {
      id: 4,
      name: "Blue Jeans",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1687294575742-27c7f9fd6935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 40,
      quantity: 1,
    },
    {
      id: 5,
      name: "Blue Jeans",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1687294575742-27c7f9fd6935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 40,
      quantity: 1,
    },
  ];

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
