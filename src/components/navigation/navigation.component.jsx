import { Link, Outlet } from "react-router";

import CartDropdown from "./cart/cart-dropdown/cart-dropdown.component";
import CartIcon from "./cart/cart-icon/cart-icon.component";
import CrwnLogo from "../../assets/crown.svg";
import { Fragment } from "react";
import classes from "./navigation.module.css";

const Navigation = () => {
  const currentUser = false;
  const isCartOpen = false;

  const signOutUser = () => console.log("test");

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
