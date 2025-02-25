import { Apple } from "@mui/icons-material"
import "./Widgetlg.css"
import { userRequest } from "../../requestMethods";
import { useState, useEffect } from "react";



const Widgetlg = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
            const getOrders = async () => {
                try{
                const res  = await userRequest.get("orders")
                setOrders(res.data)
                }   
                catch(err){
                    console.log(err)
                }
            }
            getOrders()
        },[]);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton"+ type}>{type}</button>
    }


    return <div className="widgetlg">
        <h3 className="widgetLgTitle">Latest Transactions</h3>
        <table className="widgetLgTable">
            <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
                <td className="widgetLgUser">
                    {/* <img src="https://images.pexels.com/photos/29032720/pexels-photo-29032720/free-photo-of-stylish-portrait-of-a-man-in-a-suit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="widgetLgImg" /> */}
                    <span className="widgetLgName">{order.userId}</span>
                </td>
                <td className="widgetLgDate">{(order.createdAt)}</td>
                <td className="widgetLgAmount">{order.amount}</td>
                <td className="widgetLgStatus"><Button type={order.status}/></td>
            </tr>
            ))}
        </table>
    </div>
}

export default Widgetlg;