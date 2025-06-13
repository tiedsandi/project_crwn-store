import "./index.css";

import { persistor, store } from "./app/store";

import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);

// TODO :
// [ ] : kasih loading
// [x] : kasih pop up berhasil
// [ ] : dashboard admin (grafik penjualan hari ini, jumlah produk terbanyak di beli)
// [ ] : dashboard transcation

// BUG :
// [ ] : gunakan bahas inggris
// [ ] : kasih animasi
// [ ] : tablenya disesuaikan bisa search, atur sort dari table head
// [ ] : kasih navigate ketika sudah login, user ke shop/ home, kalo admin ke dashboard

// TODO PROJECT :
// [ ] buat api golang untuk react management phone dan address
// [ ] buat typescript untuk eventmanagemnt
// [ ] perbaiki personla web, tanya ai, kasih filter
// [ ] buat project nextjs
// [ ] buat portofolio pdf

// kasih waktu 2 jam pagi, 2jam siang, dan 1 jam malam
// buat project dari yt
