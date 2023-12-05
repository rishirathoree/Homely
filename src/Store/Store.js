import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  AuthenticationSlice,
  CategorySlice,
  ProductSlice,
  SubcategorySlice,
} from "./Slices/Index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuth = persistReducer(persistConfig, AuthenticationSlice);

const rootReducer = {
  Authenticate: persistedAuth,
  Products: ProductSlice,
  Category: CategorySlice,
  Subcategory:SubcategorySlice
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
