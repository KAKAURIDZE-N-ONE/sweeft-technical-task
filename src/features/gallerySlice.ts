import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GalleryState {
  searchHistory: string[];
  pageIndex: number;
  imagesData: object[];
}

const initialState: GalleryState = {
  searchHistory: [],
  pageIndex: 1,
  imagesData: [],
};

const customerSlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    addSearchText(state, action: PayloadAction<string>) {
      state.searchHistory.push(action.payload);
    },
    updatePageIndex(state) {
      state.pageIndex = state.pageIndex + 1;
    },
    updateImagesData(state, action: PayloadAction<object>) {
      state.imagesData.push(action.payload);
    },
  },
});

export const { addSearchText, updatePageIndex, updateImagesData } =
  customerSlice.actions;
export default customerSlice.reducer;
