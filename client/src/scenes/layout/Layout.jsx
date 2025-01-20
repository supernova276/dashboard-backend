import React,{useState} from 'react'
import {Box,useMediaQuery } from "@mui/material"
import {Outlet,useNavigate} from "react-router-dom"
import NavBar from '../../components/NavBar'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated } from 'state/user';
// import { useNavigate } from 'react-router-dom'



const Layout = () => {

  // usemediaquery returns true if it is a desktop screen else returns false for mobie screens
  const navigate = useNavigate(); 
  const isNonMobile=useMediaQuery("(min-width:600px)")
  const [isSidebarOpen,setIssidebarOpen]=useState(true)
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    navigate('/login/')
    return;
}

  return (
   <Box display={isNonMobile?'flex':'block'} width="100%" height="100%">
    <Sidebar
       data={user}
       isNonMobile={isNonMobile}
       drawerWidth="250px"
       isSidebarOpen={isSidebarOpen}
       setIssidebarOpen={setIssidebarOpen}
    />
    <Box sx={{width:"100%"}}>
    <NavBar
    data={user}
    isSidebarOpen={isSidebarOpen}
    setIssidebarOpen={setIssidebarOpen}
    />
    <Outlet/>
   </Box>
   </Box>
  )
}

export default Layout
