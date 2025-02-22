import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import RecordChart from "./RecordChart";

function BarChartMonth(props) {
  const {dataKey}     = props;
  const monthlyData = useSelector(selectMonthlyData);

  return (
    <RecordChart
      dataKey={dataKey}
      recordData={monthlyData}
      timeUnit={'month'}
    />
  )
}

export default BarChartMonth;
