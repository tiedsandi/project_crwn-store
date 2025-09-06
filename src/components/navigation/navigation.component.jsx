import { Fragment, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import CartDropdown from "@/features/cart/components/cart-dropdown/cart-dropdown.component";
import CartIcon from "@/features/cart/components/cart-icon/cart-icon.component";
import CrwnLogo from "../../assets/crown.svg";
import classes from "./navigation.module.css";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import { selectIsCartOpen } from "@/features/cart/cart.selectors";
import { signOutUserThunk } from "@/features/auth/authSlice";
import { toggleCart } from "@/features/cart/cartSlice";

const Navigation = () => {
  const disaptch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const signOutUser = () => dispatch(signOutUserThunk());

  const closeMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    disaptch(toggleCart());
  };

  return (
    <Fragment>
      <div className={classes.navigationContainer}>
        <Link to="/" className={classes.logoContainer}>
          <img src={CrwnLogo} className="logo" alt="logo" />
        </Link>

        <div className={classes.navLinks_web}>
          <NavLink
            to="/shop"
            className={classes.navLink}
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#4F46E5" : "",
            })}
          >
            SHOP
          </NavLink>

          {currentUser?.email.includes("admin") && (
            <NavLink
              to="/admin"
              className={classes.navLink}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#4F46E5" : "",
              })}
            >
              ADMIN
            </NavLink>
          )}

          {currentUser ? (
            <span className={classes.navLink} onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <NavLink
              to="/auth"
              className={classes.navLink}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#4F46E5" : "",
              })}
            >
              SIGN IN
            </NavLink>
          )}

          <CartIcon />
        </div>

        <div className={classes.mobileMenuIcon}>
          <button
            className="md:hidden flex items-center"
            onClick={closeMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className={classes.navLinks_mobile}>
            <NavLink
              to="/shop"
              className={classes.navLink}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#4F46E5" : "",
              })}
            >
              SHOP
            </NavLink>

            {currentUser?.email.includes("admin") && (
              <NavLink
                to="/admin"
                className={classes.navLink}
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#4F46E5" : "",
                })}
              >
                ADMIN
              </NavLink>
            )}

            {currentUser ? (
              <span className={classes.navLink} onClick={signOutUser}>
                SIGN OUT
              </span>
            ) : (
              <NavLink
                to="/auth"
                className={classes.navLink}
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#4F46E5" : "",
                })}
              >
                SIGN IN
              </NavLink>
            )}

            <CartIcon />
          </div>
        )}

        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
