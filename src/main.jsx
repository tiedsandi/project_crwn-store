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

// TODO PROJECT :
// [ ] buat api golang untuk react management phone dan address
// [ ] perbaiki personla web, tanya ai, kasih filter
// [ ] buat typescript untuk eventmanagemnt
// [ ] buat project nextjs
// [ ] buat portofolio pdf

// kasih waktu 2 jam pagi, 2jam siang, dan 1 jam malam
// buat project dari yt
