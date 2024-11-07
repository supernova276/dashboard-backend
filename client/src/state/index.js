import { createSlice } from '@reduxjs/toolkit';

const initialState={
    mode:"dark"
}
export const globalThemeSlice=createSlice({
    name:"global",

    initialState,

    reducers:{
        setMode:(state,param)=>{
            state.mode=state.mode==='light'? 'dark':'light'
        },

        },
    })

    export const {setMode}=globalThemeSlice.actions
    export default  globalThemeSlice.reducer