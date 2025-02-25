import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import "./Chart.css"

const Chart = ( {title, data, dataKey, grid}) => {
    return <div className="Chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4/1} >
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#5550bd"/>
                <Line type="monotone" stroke="blue" dataKey={dataKey} />
                <Tooltip contentStyle={{color:"black", backgroundColor: "red"}}/>
                {grid && <CartesianGrid stroke="grey" strokeDasharray="5 5"/>}
            </LineChart>
        </ResponsiveContainer>
    </div>
}

export default Chart;