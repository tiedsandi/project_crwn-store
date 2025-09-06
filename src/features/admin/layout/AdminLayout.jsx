import { NavLink, Outlet, useNavigate } from "react-router";

import { signOutUserThunk } from "@/features/auth/authSlice";
import styles from "./AdminLayout.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(signOutUserThunk());
    navigate("/auth");
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Hamburger */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <h2 className={styles.logo}>Admin</h2>
        <nav className={styles.nav}>
          <NavLink to="/admin" onClick={closeSidebar}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" onClick={closeSidebar}>
            Products
          </NavLink>
          <NavLink to="/admin/transactions" onClick={closeSidebar}>
            Transactions
          </NavLink>
          <NavLink to="/shop" onClick={closeSidebar}>
            Shop
          </NavLink>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
