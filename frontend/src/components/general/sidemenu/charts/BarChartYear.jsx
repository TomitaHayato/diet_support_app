import { useSelector } from "react-redux";
import { selectYearlyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";

function BarChartYear() {
  const yearlyData = useSelector(selectYearlyData);

  return (
    <>
      <ChartBlocks recordData={yearlyData} timeUnit={'year'} />
    </>
  )
}

export default BarChartYear;
