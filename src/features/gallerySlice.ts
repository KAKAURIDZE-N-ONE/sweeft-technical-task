import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  likes: number;
}

interface ImageDetails {
  image?: string;
  downloads?: number;
  likes?: number;
  views?: number;
}

interface GalleryState {
  searchHistory: string[];
  pageIndex: number;
  imagesData: Image[];
  showModal: boolean;
  imageDetails: ImageDetails | object; // Define the type of imageDetails
}

const initialState: GalleryState = {
  searchHistory: [],
  pageIndex: 0,
  imagesData: [],
  showModal: false,
  imageDetails: {},
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
      state.imagesData.push(...action.payload);
    },
    clearImagesData(state) {
      state.imagesData = [];
    },
    resetPageIndex(state) {
      state.pageIndex = 1;
    },
    updateShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    updateImageDetails(state, action: PayloadAction<ImageDetails>) {
      state.imageDetails = { ...state.imageDetails, ...action.payload };
      console.log(state.imageDetails);
    },
    clearImageDetails(state) {
      state.imageDetails = {};
    },
  },
});

export const {
  addSearchText,
  updatePageIndex,
  updateImagesData,
  clearImagesData,
  resetPageIndex,
  updateShowModal,
  updateImageDetails,
  clearImageDetails,
} = customerSlice.actions;
export default customerSlice.reducer;
