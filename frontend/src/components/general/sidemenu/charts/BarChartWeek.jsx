import { useSelector } from "react-redux";
import { selectWeeklyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";

function BarChartWeek() {
  const weeklyData = useSelector(selectWeeklyData);

  return (
    <>
      {/* TODO: 週を指定してAPIにリクエスト */}
      {/* react-date-picker? */}
      <ChartBlocks recordData={weeklyData} timeUnit={'week'} />
    </>
  )
}

export default BarChartWeek;
