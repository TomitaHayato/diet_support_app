import { useContext } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SideMenuContext } from "../../../../Contexts/Contexts";
import { CustomTooltip } from "./CustomTooltip";


function BarChartWeek(props) {
  const {dataKey}    = props;
  const {weeklyData} = useContext(SideMenuContext);

  return (
    <div className="w-full h-56 text-xs">
      <ResponsiveContainer>
        <BarChart
          data  ={weeklyData}
          margin={{
            top:    5,
            right:  0,
            left:   0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* 軸ラベル */}
          <XAxis dataKey={"dow"} />
          <YAxis />
          <Tooltip content={<CustomTooltip dataKey={dataKey} labelUnit={'曜日'}/>}/>
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

export default BarChartWeek;
