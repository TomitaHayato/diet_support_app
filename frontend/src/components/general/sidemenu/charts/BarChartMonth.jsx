import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";

function BarChartMonth() {
  const monthlyData = useSelector(selectMonthlyData);

  return (
    <>
      <ChartBlocks recordData={monthlyData} timeUnit={'month'} />
    </>
  )
}

export default BarChartMonth;
