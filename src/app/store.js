import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import authSlice from "../features/auth/AuthSlice";

const persistConfig = {
    key: "root",
    storage,
};

const authPersist = persistReducer(persistConfig, authSlice);

export const store = configureStore({
    reducer: {
        authSlice: authPersist,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);
