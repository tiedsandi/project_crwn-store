import cartReducer from "@/features/cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./testingSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});
