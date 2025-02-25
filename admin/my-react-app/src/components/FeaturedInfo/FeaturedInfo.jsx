import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import "./FeaturedInfo.css"
import {useState, useEffect} from "react"
import { userRequest } from "../../requestMethods"


const FeaturedInfo = () => {
    const [income, setIncome] = useState([])
    const [percentage, setPercentage] = useState(0) 

    useEffect(() => {
        const getIncome = async () => {
        try{    
            const res = await userRequest("orders/income")
            const responseData = res.data.sort((a, b) => b._id - a._id);
            setIncome(responseData)
            if (res.data.length > 1) {  // ✅ Ensure index 1 exists
                setPercentage((res.data[0].total * 100) / res.data[1].total - 100);
            }
        } catch(error){
            console.log("Error fetching Income:", error)
        }
        }
        getIncome()
    },[])
console.log(income)

    return <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">₹{income.length > 0 ? income[0].total.toFixed(1) : 0}</span>
                <span className="featuredMoneyRate">{percentage.toFixed(1)}% 
                    {percentage < 0 ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" /> }</span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">₹50,432</span>
                <span className="featuredMoneyRate">43.5 <ArrowUpward className="featuredIcon" /> </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Revenue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">₹50,432</span>
                <span className="featuredMoneyRate">67.3 <ArrowUpward className="featuredIcon" /> </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
    </div>
}

export default FeaturedInfo;