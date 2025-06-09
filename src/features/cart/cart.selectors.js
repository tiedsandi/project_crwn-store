import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.cartIsOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

// export const selectCartItems = (state) => state.cart.cartItems;
// export const selectIsCartOpen = (state) => state.cart.cartIsOpen;
// export const selectCartCount = (state) =>
//   state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
// export const selectCartTotal = (state) =>
//   state.cart.cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );
