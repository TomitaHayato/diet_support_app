import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { secToMin } from "../../../../utils/recordDataCtl";


function RecordChart(props) {
  const {dataKey, recordData, timeUnit}  = props;

  const xlabelMap = {
    'week':  'dow',
    'month': 'date',
    'year':  'month',
  }

  const timeUnitMap = {
    'week': '曜日',
    'month': '日',
    'year': '月',
  }

  return (
    <div className="w-full h-56 text-xs">
      <ResponsiveContainer>
        <BarChart
          data  ={recordData}
          margin={{
            top:    5,
            right:  0,
            left:   0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* 軸ラベル */}
          <XAxis dataKey={xlabelMap[timeUnit]} />
          { dataKey === 'totalTime' ? <YAxis tickFormatter={secToMin} /> : <YAxis /> }
          <Tooltip content={<CustomTooltip dataKey={dataKey} labelUnit={timeUnitMap[timeUnit]}/>}/>
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

export default RecordChart;
