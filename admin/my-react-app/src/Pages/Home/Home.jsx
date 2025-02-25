import {useState, useMemo, useEffect} from "react"
import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./Home.css"
import {userData} from "../../../dummydata"
import Widgetsm from "../../components/Widgetsm/Widgetsm";
import Widgetlg from "../../components/Widgetlg/Widgetlg";
import { userRequest } from "../../requestMethods";


const Home = () => {
    const [userStats, setUserStats] = useState([])

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    )

    useEffect(() => {
        const getStats = async () => {
            try{
                const res = await userRequest.get("users/stats")
                res.data.map((item) => 
                    setUserStats((prev) => [
                        ...prev,
                        {name: MONTHS[item._id - 1], "Active User": item.total}
                    ])
                ) 
            }
            catch{}
        }
        getStats()
    }, [MONTHS])




    return <div className="Home">
        <FeaturedInfo />
        <Chart title="User Analytics" data={userStats} dataKey="uv" grid/>
        <div className="widget">
            <Widgetsm/>
            <Widgetlg/>
        </div>
    </div>
}

export default Home;