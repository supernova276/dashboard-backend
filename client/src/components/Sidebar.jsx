import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
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
    useTheme
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
import { useNavigate } from 'react-router-dom'



const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: "Products",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Customers",
      icon: <Groups2Outlined />,
    },
    {
      text: "Transactions",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Geography",
      icon: <PublicOutlined />,
    },
    {
      text: "Sales",
      icon: null,
    },
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    {
      text: "Monthly",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    {
      text: "Management",
      icon: null,
    },
    {
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      text: "Performance",
      icon: <TrendingUpOutlined />,
    },
  ];

const Sidebar=({drawerWidth, isSideBarOpen, setIsSidebarOpen, isNonMobile})=>{

    const {pathName}= useLocation()
    const [active,setActive]=useState("");
    const theme=useTheme()
    const navigate=useNavigate()

    console.log("pathhhhhhhhh",pathName)

    // wehn the path name changes correct url is set to active to detrmine what page we are on
    useEffect(()=>{
        setActive(pathName)
    },[pathName])

    return  <Box component="nav">

        {isSideBarOpen && (
            <Drawer 
            open={isSideBarOpen}
            onclose={()=>setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"

            sx={{
                "& .MuiDrawer-paper": {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSixing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                  },
            }}
            >
              <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h4" fontWeight="bold">
                                bleh
                            </Typography>
                        </Box>
                        { ! isNonMobile && (
                            <IconButton onClick={()=>setIsSidebarOpen(!isSideBarOpen)}>
                                <ChevronLeft/>
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <List>
                    {
                        navItems.map(({text,icon})=>{
                            if(!icon){
                                if (!icon) {
                                    return (
                                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        {text}
                                      </Typography>
                                    );
                                  }
                                  const lctext=text.toLowerCase()

                                  return (<ListItem key={text} disablePadding>
                                    <ListItemButton
                                        onClick={
                                            ()=>{
                                                navigate(`${lctext}`)
                                                setActive(lctext)
                                            }
                                        }

                                        sx={{
                                            backgroundColor:
                          active === lctext
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lctext
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                      >
                       
                       <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lctext
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>

                      <ListItemText primary={text} />
                      {active === lctext && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}

                      </ListItemButton>

                                  
                      </ListItem>)
                            }
                        })
                    }
                </List>
              </Box>
              </Drawer>

        ) }

        
    </Box>
}
export default Sidebar