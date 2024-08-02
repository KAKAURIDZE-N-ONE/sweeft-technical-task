import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  likes: number;
  alt_description: string;
}

interface ImageDetails {
  image?: string;
  downloads?: number;
  likes?: number;
  views?: number;
}

//GalleryState_ ში ვინახავ ყველა საჭირო დატას და გლობალურ სტეიტებს ფეიჯებზე მანიპულირებისთვის.
interface GalleryState {
  searchHistory: string[];
  pageIndex: number;
  imagesData: Image[];
  showModal: boolean;
  imageDetails: ImageDetails | object;
  oldInputValue: string;
}

const initialState: GalleryState = {
  searchHistory: [],
  pageIndex: 1,
  imagesData: [],
  showModal: false,
  imageDetails: {},
  oldInputValue: "",
};

const customerSlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    // searchHistory_ში ვინახავ ყველა სიტყვას რომელიც დავსერჩე
    addSearchText(state, action: PayloadAction<string>) {
      state.searchHistory = state.searchHistory.filter(
        (el) => el !== action.payload
      );
      state.searchHistory.push(action.payload);
    },
    // infinite სქროლის დროს გვერდის ინდექსს ვცვლი ამ რედუსერით
    updatePageIndex(state) {
      state.pageIndex = state.pageIndex + 1;
    },
    // ერთ მასივში ვამატებ ყველა ფოტოს რომელიც გადაეცემა Gallery.tsx_ს
    updateImagesData(state, action: PayloadAction<Image[]>) {
      state.imagesData.push(...action.payload);
    },
    clearImagesData(state) {
      state.imagesData = [];
    },
    resetPageIndex(state) {
      state.pageIndex = 1;
    },
    // showModal განსაზღვრავს იყოს თუ არა ჩართული მოდალ ფანჯარა
    updateShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    // აქ ვწერ იმეიჯის აღწერას, მოწონებებს ვიღებ სერჩის ეიპიაიდან ხოლო აღწერილობას სტატისტიკის ეიპიაიდან
    // რადგან სტატისტიკის ეიპიაიში მოწონება ყოველთვის ნული იყო
    updateImageDetails(state, action: PayloadAction<ImageDetails>) {
      console.log(action.payload);
      state.imageDetails = action.payload;
    },
    clearImageDetails(state) {
      state.imageDetails = {};
    },
    // ძველ ინფუთ ველიუს ვიმახსოვრებ გლობალურ სტეიტში რადგან ორივე ფეიჯზე მჭირდება
    updateOldInputValue(state, action: PayloadAction<string>) {
      state.oldInputValue = action.payload;
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
  updateOldInputValue,
} = customerSlice.actions;
export default customerSlice.reducer;
