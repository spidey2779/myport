import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface sliceType {
  showCursor: boolean;
  showMenu: boolean;
  mouseBackground: string;
}

// Define the initial state using that type
const initialState: sliceType = {
  showCursor: true,
  showMenu: false,
  mouseBackground: "#00ffff89",
};

export const sliceOne = createSlice({
  name: "sliceOne",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCursor: (state, action: PayloadAction<boolean>) => {
      state.showCursor = action.payload;
    },
    setShowMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.showMenu = payload;
    },
  },
});

export const { setCursor, setShowMenu } = sliceOne.actions;

export default sliceOne.reducer;
