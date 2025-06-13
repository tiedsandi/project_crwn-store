import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// import counterReducer from "./testingSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // auth state akan disimpan
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // untuk redux-persist
    }),
});

export const persistor = persistStore(store);
