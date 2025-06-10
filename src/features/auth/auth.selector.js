// src/features/auth/auth.selector.js

import { createSelector } from "reselect";

const selectAuthReducer = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuthReducer],
  (auth) => auth.currentUser
);

export const selectIsAuthLoading = createSelector(
  [selectAuthReducer],
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  [selectAuthReducer],
  (auth) => auth.error
);
