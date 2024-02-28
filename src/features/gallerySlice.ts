import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GalleryState {
  searchHistory: string[];
}

const initialState: GalleryState = {
  searchHistory: [],
};

const customerSlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    addSearchText(state, action: PayloadAction<string>) {
      state.searchHistory.push(action.payload);
    },
  },
});

export const { addSearchText } = customerSlice.actions;
export default customerSlice.reducer;
