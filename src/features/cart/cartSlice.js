import { addCartItem, clearCartItem, removeCartItem } from "./cart.utils";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen;
    },
    setCartOpen(state, action) {
      state.cartIsOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  toggleCart,
  setCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
