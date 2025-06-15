import { NavLink, Outlet, useNavigate } from "react-router";

import { signOutUserThunk } from "@/features/auth/authSlice";
import styles from "./AdminLayout.module.css";
import { useDispatch } from "react-redux";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(signOutUserThunk());
    navigate("/auth");
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin</h2>
        <nav className={styles.nav}>
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/transactions">Transactions</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
