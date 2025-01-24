
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { BrowserRouter } from "react-router-dom";
import  Dashboard from "scenes/dashboard/Dashboard"
import Layout from "scenes/layout/Layout";
import { Navigate,Route, Routes} from "react-router-dom";
import Signup from "scenes/signup/Signup";
import Login from "scenes/login/Login"
import Products from "scenes/products/Products";
import Customers from "scenes/customers/Customers";
import Transactions from "scenes/transactions/Transactions";
import Overview from "scenes/overview/Overview"
import Daily from "scenes/daily/Daily"
import Breakdown from "scenes/breakdown/Breakdown"
import Monthly from "scenes/monthly/Monthly"

const App=()=> {
  const mode=useSelector((state)=>state.global.mode)

  const theme=useMemo(()=>createTheme(themeSettings(mode),[mode]))

  return <div className="app ">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>  
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route element={<Layout/>}>
        <Route path="/dashboard/" element={<Dashboard/>}></Route>
        <Route path="/products/" element={<Products/>}></Route>
        <Route path="/customers/" element={<Customers/>}></Route>
        <Route path="/transactions/" element={<Transactions/>}></Route>
        <Route path="/overview" element={<Overview/>}></Route>
        <Route path="/daily" element={<Daily/>}></Route>
        <Route path="/monthly" element={<Monthly/>}></Route>
        <Route path="/breakdown" element={<Breakdown/>}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  
  </div>
}

export default App;
