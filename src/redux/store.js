import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import categoryReducer from "./category/CategorySlice";
import productReducer from "./poduct/ProductSlice";
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
