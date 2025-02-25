import { Visibility } from "@mui/icons-material";
import "./Widgetsm.css"
import {useState, useEffect} from "react"
import {userRequest} from "../../requestMethods"

const Widgetsm = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async () => {
            try{
            const res  = await userRequest.get("users/")
            setUsers(res.data)
            }   
            catch(err){
                console.log(err)
            }
        }
        getUsers()
    },[]);

    return <div className="widgetsm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {users.map((user) => (
            <li className="widgetSmListItem" key={user._id}>
                <img src={user.img || "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"}
                alt={user.username}
                className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.username}</span>
                    <span className="widgetSmUserTitle">{user.title || "no title"}</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility/>
                    Display
                </button>
            </li>
            ))}
        </ul>
    </div>
}

export default Widgetsm;
