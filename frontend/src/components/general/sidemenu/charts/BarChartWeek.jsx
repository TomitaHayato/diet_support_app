import { useSelector } from "react-redux";
import { selectWeeklyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";

function BarChartWeek() {
  const weeklyData = useSelector(selectWeeklyData);

  return (
    <>
      <ChartBlocks recordData={weeklyData} timeUnit={'week'} />
    </>
  )
}

export default BarChartWeek;
