import React,{useState} from 'react'
import {Box,useMediaQuery } from "@mui/material"
import {Outlet} from "react-router-dom"
import NavBar from '../../components/NavBar'
import Sidebar from '../../components/SideBar'


const Layout = () => {

  // usemediaquery returns true if it is a desktop screen else returns false for mobie screens
  const isNonMobile=useMediaQuery("(min-width:600px)")
  const [isSidebarOpen,setIssidebarOpen]=useState(true)


  return (
   <Box display={isNonMobile?'flex':'block'} width="100%" height="100%">
    <Sidebar
       isNonMobile={isNonMobile}
       drawerWidth="250px"
       isSidebarOpen={isSidebarOpen}
       setIssidebarOpen={setIssidebarOpen}
    />
    <Box>
    <NavBar
    isSidebarOpen={isSidebarOpen}
    setIssidebarOpen={setIssidebarOpen}
    />
    {/* <Outlet/> */}
   </Box>
   </Box>
  )
}

export default Layout
