import { Link, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import CartDropdown from "@/features/cart/components/cart-dropdown/cart-dropdown.component";
import CartIcon from "@/features/cart/components/cart-icon/cart-icon.component";
import CrwnLogo from "../../assets/crown.svg";
import { Fragment } from "react";
import classes from "./navigation.module.css";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import { selectIsCartOpen } from "@/features/cart/cart.selectors";
import { signOutUserThunk } from "@/features/auth/authSlice";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutUserThunk());

  return (
    <Fragment>
      <div className={classes.navigationContainer}>
        <Link to="/" className={classes.logoContainer}>
          <img src={CrwnLogo} className="logo" alt="logo" />
        </Link>

        <div className={classes.navLinks}>
          <Link to="/shop" className={classes.navLink}>
            SHOP
          </Link>
          {currentUser ? (
            <span className={classes.navLink} onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link to="/auth" className={classes.navLink}>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
