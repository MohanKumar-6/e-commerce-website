import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@mui/icons-material";
import "./User.css"
import { Link } from "react-router-dom";

const User = () => {
    return(
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img 
                            src="https://sortedmag.com/wp-content/uploads/2023/03/Bear-Grylls-cropped.jpg" 
                            alt="" 
                            className="userShowImg" 
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Bear grylls</span>
                            <span className="userShowUserTitle">Survivalist</span>
                        </div>
                    </div>
                    <div className="userShowBottom"></div>
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">bearG99</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">10.12.1987</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">+76 2365543</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">bearG99@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon"/>
                            <span className="userShowInfoTitle">Horsham | UK</span>
                        </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                            <label>Username</label>
                            <input 
                                type="text"
                                placeholder="bearG99"
                                className="userUpdateInput"
                            />
                            </div>
                            <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input 
                                type="text"
                                placeholder="Bear Grylls"
                                className="userUpdateInput"
                            />
                            </div>
                            <div className="userUpdateItem">
                            <label>Email</label>
                            <input 
                                type="text"
                                placeholder="bearG99@gmail.com"
                                className="userUpdateInput"
                            />
                            </div>
                            <div className="userUpdateItem">
                            <label>Phone</label>
                            <input 
                                type="text"
                                placeholder="+76 2365543"
                                className="userUpdateInput"
                            />
                            </div>
                            <div className="userUpdateItem">
                            <label>Phone</label>
                            <input 
                                type="text"
                                placeholder="Horsham | UK"
                                className="userUpdateInput"
                            />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img 
                                    className="userUpdateImg" 
                                    src="https://sortedmag.com/wp-content/uploads/2023/03/Bear-Grylls-cropped.jpg"
                                    alt=""
                                /> 
                                <label htmlFor="file"><Publish className="userUpdateIcon"/></label>
                                <input type="file" id="file" style={{display:"none"}}/> 
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User;