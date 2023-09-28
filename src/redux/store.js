import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import userReducer from "./auth/userSlice";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";
import systemReducer from "./systemState/systemSlice";

const reducers = combineReducers({
  userInfo: userReducer,
  category: categoryReducer,
  product: productReducer,
  system: systemReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
