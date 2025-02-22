import { useSelector } from "react-redux";
import { selectYearlyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import RecordChart from "./RecordChart";

function BarChartYear(props) {
  const {dataKey}  = props;
  const yearlyData = useSelector(selectYearlyData);

  return (
    <RecordChart
      dataKey={dataKey}
      recordData={yearlyData}
      timeUnit={'year'}
    />
  )
}

export default BarChartYear;
