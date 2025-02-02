// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    // token: null,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            // state.token = token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            // state.token = null;
            state.isAuthenticated = false;  
        }
    }
});

export const { setCredentials, logout } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.user.user?.accesstoken;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;