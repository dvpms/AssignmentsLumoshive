import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./async/productSlice";
import logsReducer from "./async/logSlice"

export const store = configureStore({
  reducer: {
    products: productReducer, // Tambahkan produk ke store
    logs: logsReducer,
  },
});

export default store;
