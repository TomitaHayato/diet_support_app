import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartTemplate() {
  const userDataSet = [
    {
      name: "月",
      data: 400,
    },
    {
      name: "火",
      data: 0,
    },
    {
      name: "水",
      data: 700,
    },
    {
      name: "木",
      data: 50,
    },
    {
      name: "金",
      data: 90,
    },
    {
      name: "土",
      data: 200,
    },
    {
      name: "日",
      data: 100,
    },
    {
      name: "日",
      data: 100,
    },
    {
      name: "日",
      data: 100,
    },
    {
      name: "日",
      data: 100,
    },
    {
      name: "日",
      data: 100,
    },
    {
      name: "日",
      data: 100,
    },
  ]

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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* 凡例 */}
          <Legend
            verticalAlign={"top"}
            iconSize={12}
            height={28}
          />
          <Bar dataKey="data" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>

  )
}

export default BarChartTemplate;