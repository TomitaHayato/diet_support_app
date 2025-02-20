import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../../../Redux/Slice/workoutRecordsSlice";

function BarChartMonth(props) {
  const {dataKey}     = props;
  const monthlyData = useSelector(selectMonthlyData);

  return (
    <div className="w-full h-56 text-xs">
      <ResponsiveContainer>
        <BarChart
          data  ={monthlyData}
          margin={{
            top:    5,
            right:  0,
            left:   0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* 軸ラベル */}
          <XAxis dataKey={"date"} />
          <YAxis />
          <Tooltip content={<CustomTooltip dataKey={dataKey} labelUnit={'日'}/>}/>
          {/* 凡例 */}
          <Legend
            verticalAlign={"top"}
            iconSize={12}
            height={28}
          />
          <Bar dataKey={dataKey} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>

  )
}

export default BarChartMonth;
