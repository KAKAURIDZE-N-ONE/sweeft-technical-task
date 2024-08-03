import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Result {
  alt_description: string;
  alternative_slugs: AlternativeSlugs;
  asset_type: string;
  blur_hash: string;
  color: string;
  created_at: string;
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  promoted_at: string | null;
  slug: string;
  sponsorship: string | null;
  tags: Tag[];
  updated_at: string;
  urls: Urls;
  user: User;
  width: number;
}

interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  [key: string]: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Tag {
  title: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  [key: string]: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  [key: string]: any;
}

export interface ApiResponse {
  total: number;
  results: Result[];
  total_pages: number;
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
  imagesData: Result[];
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
    updateObjectData(state, action: PayloadAction<ApiResponse>) {
      state.imagesData.push(...action.payload.results);
    },
    // ერთ მასივში ვამატებ ყველა ფოტოს რომელიც გადაეცემა Gallery.tsx_ს
    updateImagesData(state, action: PayloadAction<Result[]>) {
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
  updateObjectData,
} = customerSlice.actions;
export default customerSlice.reducer;
