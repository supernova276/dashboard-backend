import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import globalReducer from "state/index" 
import {Provider} from "react-redux"

const store=configureStore({
  reducer:{
    global:globalReducer
  },
})
// global reducer

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);