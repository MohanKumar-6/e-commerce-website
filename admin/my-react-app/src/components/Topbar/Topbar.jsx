import { LanguageOutlined } from "@mui/icons-material";
import "./Topbar.css"
import { useState } from "react"
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { persistor } from "../../redux/store"; 


const Topbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        persistor.purge()
        handleClose();
        window.location.reload()
    }

    return (
    <div className="Container">
        <div className="left">
            <div className="titleLogo">Mantra Admin</div>
        </div>  
        <div className="right">
            <div className="TopbarIconContainer">
                <NotificationsOutlinedIcon/>
                <span className="iconbadge" >2</span>
                <LanguageOutlined/>
                <SettingsIcon/>
                <AccountCircleIcon style={{ fontSize: '2.5rem' }} onClick={handleClick}/>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    </div>
    );
}

export default Topbar;