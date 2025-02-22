import { useSelector } from "react-redux";
import { selectWeeklyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import RecordChart from "./RecordChart";


function BarChartWeek(props) {
  const {dataKey}  = props;
  const weeklyData = useSelector(selectWeeklyData);

  return (
    <RecordChart
      dataKey={dataKey}
      recordData={weeklyData}
      timeUnit={'week'}
    />
  )
}

export default BarChartWeek;
