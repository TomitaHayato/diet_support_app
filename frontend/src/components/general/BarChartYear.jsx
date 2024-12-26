import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AuthContext from "../../Contexts/AuthContext";
import { defaultYearlyData } from "../../utils/defaultRecordData";

function BarChartYear(props) {
  // eslint-disable-next-line react/prop-types
  const {data}       = props;
  const {yearlyData} = useContext(AuthContext);

  const [userDataSet, setUserDataSet] = useState([...defaultYearlyData]);

  // // ユーザーデータが存在しない月に、デフォルトのデータを当てはめる
  function makeUserData() {
    const userYearlyData = [...defaultYearlyData];

    yearlyData.forEach(data =>  userYearlyData[data.month - 1] = data);

    return userYearlyData;
  }
  
  useEffect(() => {
    const userYearlyData = makeUserData();
    setUserDataSet(userYearlyData);
  }, [yearlyData])

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
          <XAxis dataKey={"month"} />
          <YAxis />
          <Tooltip />
          {/* 凡例 */}
          <Legend
            verticalAlign={"top"}
            iconSize={12}
            height={28}
          />
          <Bar dataKey={data} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>

  )
}

export default BarChartYear;
