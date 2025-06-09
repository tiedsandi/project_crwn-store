import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    generalInput: (state, action) => {
      const { value, operator } = action.payload;

      switch (operator) {
        case "kali":
          state.value *= value;
          break;
        case "bagi":
          state.value /= value;
          break;
        case "tambah":
          state.value += value;
          break;
        case "kurang":
          state.value -= value;
          break;
        default:
          console.warn("Unknown operator:", operator);
          break;
      }
    },
  },
});

export const { increment, decrement, incrementByAmount, generalInput } =
  counterSlice.actions;

export default counterSlice.reducer;
