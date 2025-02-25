import { LanguageOutlined } from "@mui/icons-material";
import "./Topbar.css"
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Topbar = () => {
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
                <AccountCircleIcon style={{ fontSize: '2.5rem' }} />
            </div>
        </div>
    </div>
    );
}

export default Topbar;