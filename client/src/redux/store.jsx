import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import profileReducer from "./profileSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedChatReducer = persistReducer(persistConfig, chatReducer);
const persistedProfileReducer = persistReducer(persistConfig, profileReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    chat: persistedChatReducer,
    profile: persistedProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Use the function returned by getDefaultMiddleware
});

export const persistor = persistStore(store);
export default store;
