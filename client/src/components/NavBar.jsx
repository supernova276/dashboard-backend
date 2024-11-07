
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
import {useTheme,AppBar,Toolbar, IconButton, Typography, Button, InputBase} from "@mui/material"
// import profileImage 

const NavBar=()=>{
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
            <IconButton onClick={()=>{console.log("hellooooo open close sidebar")}}>
                <MenuIcon/>
            </IconButton>

        <FlexBetween backgroundColor={theme.palette.background.alt} 
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
        
        >
            <InputBase placeholder="Search...."></InputBase>
            <IconButton>
                <Search/>
            </IconButton>
        </FlexBetween>

        </FlexBetween>

        {/* right side */}
        
        <FlexBetween gap="1.5rem">
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

        </Toolbar>


        </AppBar>


}
export default NavBar