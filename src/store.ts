import { combineReducers, configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./features/gallerySlice";

const rootReducer = combineReducers({
  gallery: galleryReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export default store;
