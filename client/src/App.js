
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { create } from "@mui/material/styles/createTransitions";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { BrowserRouter } from "react-router-dom";
import  Dashboard from "scenes/dashboard/Dashboard"
import Layout from "scenes/layout/Layout";
import {Route, Routes} from 'react'
import { Navigate } from "react-router-dom";

function App() {
  const mode=useSelector((state)=>state.global.mode)

  const theme=useMemo(()=>createTheme(themeSettings((mode)),[mode]))

  return <div className="app ">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>  
      <Routes>
        {/* <Route element={<Layout/>}> */}
        <Route path="/" element={<Navigate to ="/dashboard" replace/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        {/* </Route> */}
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  
  </div>
}

export default App;