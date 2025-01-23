import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SideMenuContext } from "../../Contexts/Contexts";
import { defaultMonthlyData } from "../../utils/defaultRecordData";
import { CustomTooltip } from "./CustomTooltip";

function BarChartMonth(props) {
  // eslint-disable-next-line react/prop-types
  const {dataKey}     = props;
  const {monthlyData} = useContext(SideMenuContext);

  const [userDataSet, setUserDataSet] = useState([...defaultMonthlyData]);

  // // ユーザーデータが存在しない月に、デフォルトのデータを当てはめる
  function makeUserData() {
    const userMonthlyData = [...defaultMonthlyData];

    monthlyData.forEach(data =>  userMonthlyData[data.date - 1] = data);

    return userMonthlyData;
  }
  
  useEffect(() => {
    const userMonthlyData = makeUserData();
    setUserDataSet(userMonthlyData);
  }, [monthlyData])

  return (
    <div className="w-full h-56 text-xs">
      <ResponsiveContainer>
        <BarChart
          data  ={userDataSet}
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
