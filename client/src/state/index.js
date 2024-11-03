import { createTheme } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import { themeSettings } from 'theme';

const initialState={
    mode:"dark"
}
export const globalThemeSlice=createSlice({
    name:"global",

    initialState,

    reducers:{
        setMode:(state,param)=>{
            state.mode=state.mode==='light'? 'dark':'dark'
        }

        }
    })

    export const {setMode}=globalThemeSlice.actions
    export default  globalThemeSlice.reducer