import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { signInUser, signUpUser } from "./auth.utils";

import { auth } from "@/utils/firebase";

// Thunks
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const user = await signUpUser({ email, password, displayName });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await signInUser({ email, password });
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutUserThunk = createAsyncThunk("auth/signOut", async () => {
  await signOut(auth);
});

export const checkUserSession = createAsyncThunk(
  "auth/checkUserSession",
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject(rejectWithValue("No user logged in"));
        }
      });
    });
  }
);

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sign Out
      .addCase(signOutUserThunk.fulfilled, (state) => {
        state.currentUser = null;
      })

      // Check User Session
      .addCase(checkUserSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(checkUserSession.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
