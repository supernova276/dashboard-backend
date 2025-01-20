
import React,{useState} from "react"
import {LightModeOutlined, DarkModeOutlined, Menu as MenuIcon,
    Search,
    Settings,
    SettingsOutlined,
    ArrowDropDownOutlined
} from "@mui/icons-material"

import FlexBetween from "components/FlexBetween"
import {useDispatch} from 'react-redux'
import {setMode} from "state"
import {useTheme,AppBar,Toolbar, IconButton, Typography, Button, InputBase, Box} from "@mui/material"
import profileImage from "assets/profile.jpeg";
// import profileImage 


const searchInput=(e)=>{
  console.log(e.target.value)
}

const NavBar=({data,isSidebarOpen,setIssidebarOpen})=>{
    const dispatch=useDispatch()
    const theme= useTheme();
    
    return <AppBar sx={{
        position:"static",
        background:"none",
        boxShadow:"none"
    }}>

{/* toolbar works with app bar and sets property of children to make them horizontaly aligned */}
        <Toolbar sx={{justifyContent:"space-between"}}>
        {/* left side */}
        <FlexBetween>
            <IconButton onClick={()=>{setIssidebarOpen((prev)=>!prev)}}>
            {!isSidebarOpen && <MenuIcon/>}
            </IconButton>

        <FlexBetween backgroundColor={theme.palette.background.alt} 
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
        
        >
            <InputBase placeholder="Search...." onInput={searchInput}></InputBase>
            <IconButton>
                <Search/>
            </IconButton>
        </FlexBetween>

        </FlexBetween>

        {/* right side */}
        
        <FlexBetween gap="1.5rem" sx={{ ml: "auto" }}>
            <IconButton onClick={()=>dispatch(setMode())}>
                {theme.palette.mode==="dark"? (
                    <DarkModeOutlined sx={{fontSize:"25px"}}/>

                ):
                (<LightModeOutlined sx={{fontSize: "25px"}}/> )}
            </IconButton>

            <IconButton>
                <SettingsOutlined sx={{fontSize:"25px"}}></SettingsOutlined>
            </IconButton>
        </FlexBetween>

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
              {/* <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              /> */}
            </FlexBetween>
        </Toolbar>


        </AppBar>


}
export default NavBar