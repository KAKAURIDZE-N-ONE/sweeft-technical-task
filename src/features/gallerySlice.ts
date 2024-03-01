import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  url: string;
  caption?: string;
}

interface GalleryState {
  searchHistory: string[];
  pageIndex: number;
  imagesData: Image[][];
}

const initialState: GalleryState = {
  searchHistory: [],
  pageIndex: 0,
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
    updateImagesData(state, action) {
      console.log(action.payload);
      state.imagesData.push(action.payload);
    },
    clearImagesData(state) {
      state.imagesData = [];
    },
    resetPageIndex(state) {
      state.pageIndex = 1;
    },
  },
});

export const {
  addSearchText,
  updatePageIndex,
  updateImagesData,
  clearImagesData,
  resetPageIndex,
} = customerSlice.actions;
export default customerSlice.reducer;
