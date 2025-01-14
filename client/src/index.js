import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { PersistGate } from 'redux-persist/integration/react';
import globalReducer from "state/index";
import userReducer from "state/user";
import { Provider } from "react-redux";
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from 'state/api';

// Persist configuration
const persistConfig = {
  key: 'root', // key for localStorage
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['someReducer'] // won't be persisted
  // whitelist: ['user'] // only these will be persisted
};

// Create persisted reducers for the ones you want to persist
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedGlobalReducer = persistReducer(persistConfig, globalReducer);

const store = configureStore({
  reducer: {
    global: persistedGlobalReducer,
    user: persistedUserReducer,
    [api.reducerPath]: api.reducer // Usually API cache doesn't need to be persisted
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);