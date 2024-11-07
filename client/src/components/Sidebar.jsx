import React,{useState,useEffect,useLocation} from 'react'
import {Outlet} from "react-router-dom"
import NavBar from '../../components/NavBar'
import FlexBetween from './FlexBetween'

import{
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    UseTheme
} from "@mui/material"

import {
    SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material"

const Sidebar=({drawerWidth, isSideBarOpen, setIsSidebarOpen, isNonMobile})=>{

    const {pathName}= useLocation()
    const [active,setActive]=useState("");
    const useTheme=useTheme()


    // wehn the path name changes correct url is set to active to detrmine what page we are on
    useEffect(()=>{
        setActive(pathName.substring(1))
    },[pathName])

    return  <Box component="nav">
        
    </Box>
}
export default Sidebar