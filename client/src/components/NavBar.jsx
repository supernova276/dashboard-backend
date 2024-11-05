
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
import {useTheme,AppBar} from "@mui/material"
// import profileImage 

const NavBar=()=>{
    const dispatch=useDispatch()
    const theme= useTheme();

    return <AppBar sx={{
        position:"static",
        background:"none",
        boxShadow:"none"
    }}>

        <ToolBar sx={{justifyContent:"space-between"}}/>
        {/* left side */}

        </AppBar>


}
export default NavBar