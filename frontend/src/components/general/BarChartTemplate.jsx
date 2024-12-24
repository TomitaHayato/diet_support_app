import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartTemplate() {
  const userDataSet = [
    {
      name: "1",
      data: 0.2,
    },
    {
      name: "2",
      data: 0,
    },
    {
      name: "3",
      data: 7,
    },
    {
      name: "4",
      data: 5,
    },
    {
      name: "5",
      data: 9,
    },
    {
      name: "6",
      data: 2,
    },
    {
      name: "7",
      data: 1,
    },
    {
      name: "8",
      data: 1,
    },
    {
      name: "9",
      data: 1,
    },
    {
      name: "10",
      data: 0,
    },
    {
      name: "11",
      data: 0,
    },
    {
      name: "12",
      data: 0,
    },
    {
      name: "1",
      data: 4,
    },
    {
      name: "2",
      data: 0,
    },
    {
      name: "3",
      data: 0.88,
    },
    {
      name: "4",
      data: 5,
    },
    {
      name: "5",
      data: 9,
    },
    {
      name: "6",
      data: 0,
    },
    {
      name: "7",
      data: 0,
    },
    {
      name: "8",
      data: 1,
    },
    {
      name: "9",
      data: 1,
    },
    {
      name: "10",
      data: 1,
    },
    {
      name: "11",
      data: 1,
    },
    {
      name: "12",
      data: 1,
    },
    {
      name: "1",
      data: 4,
    },
    {
      name: "2",
      data: 0,
    },
    {
      name: "3",
      data: 0,
    },
    {
      name: "4",
      data: 5,
    },
    {
      name: "5",
      data: 0,
    },
    {
      name: "6",
      data: 2,
    },
    {
      name: "7",
      data: 1,
    },
    {
      name: "8",
      data: 1,
    },
    {
      name: "9",
      data: 1,
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
