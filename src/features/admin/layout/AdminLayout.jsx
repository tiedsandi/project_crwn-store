import { NavLink, Outlet } from "react-router";

import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2>Admin</h2>
        <nav>
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/products">Produk</NavLink>
          <NavLink to="/admin/transactions">Transaksi</NavLink>
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
