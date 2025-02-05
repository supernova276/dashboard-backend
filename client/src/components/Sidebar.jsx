import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImage from "assets/profile.jpeg";

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
  ExpandMore,
  ExpandLess
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
    // {
    //   text: "Geography",
    //   icon: <PublicOutlined />,
    // },
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
    // {
    //   text: "Performance",
    //   icon: <TrendingUpOutlined />,
    // },
  ];

const Sidebar=({data,drawerWidth, isSidebarOpen, setIssidebarOpen, isNonMobile})=>{

    const {pathname}= useLocation()
    const [active,setActive]=useState("");
    const theme=useTheme()
    const navigate=useNavigate()
    const [expandState,setExpandState]=useState(false)


    // wehn the path name changes correct url is set to active to detrmine what page we are on
    useEffect(()=>{
        setActive(pathname)
    },[pathname])


    const handleExpandToggle = (text) => {
      setExpandState((prevState) => ({
        ...prevState,
        [text]: !prevState[text],
      }));
    };

    return  <Box component="nav">

        {isSidebarOpen && (

            <Drawer 
            open={isSidebarOpen}
            onClose={()=>setIssidebarOpen(false)}
            variant="persistent"
            anchor="left"

            sx={{
                   width: drawerWidth,
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
                <Box m="0.5rem 2rem 0rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h4" fontWeight="bold">
                                bleh
                            </Typography>
                        </Box>

                            <IconButton onClick={()=>setIssidebarOpen(!isSidebarOpen)}>
                                <ChevronLeft/>
                            </IconButton>
                    </FlexBetween>
                </Box>
                <List>
                    {
                        navItems.map(({text,icon})=>{

                                if (!icon) {
                                    return (
                                    <ListItem>
                                      
                                      <ListItemButton onClick={() => handleExpandToggle(text)}>
                                      <ListItemText key={text}>{text}</ListItemText>
                              
                                      {expandState[text] ? (
                                        <ExpandMore />
                                      ) : (
                                        <ExpandLess />
                                      )}
                                    </ListItemButton>
                                    </ListItem>
                                      
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
                          ml: "0.5rem",
                          color:
                            active === lctext
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                              fontSize:"2rem"
                        }}
                      >
                        {icon}

                      </ListItemIcon>

                      <ListItemText primary={text} />
                      {
                      
                      active === lctext && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )
                      }

                      </ListItemButton>
                        
                                  
                      </ListItem>)
                        })
                    }
                </List>
              </Box>

              <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {data.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {data.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
              </Drawer>

        ) }

        
    </Box>
}
export default Sidebar