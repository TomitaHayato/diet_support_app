import { useSelector } from "react-redux";
import { selectYearlyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";
import { useState } from "react";

function BarChartYear() {
  const yearlyData = useSelector(selectYearlyData);
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());

  function decrementYear() {
    setTargetYear(prev => --prev)
  }

  function incrementYear() {
    setTargetYear(prev => ++prev)
  }

  return (
    <>
      <div className="join w-full justify-center px-auto mb-4">
        <button className="join-item btn btn-info btn-sm" onClick={decrementYear}>«</button>
        <p className="join-item px-3 flex items-center">{targetYear}年</p>
        <button className="join-item btn btn-info btn-sm" onClick={incrementYear} disabled={targetYear === new Date().getFullYear()}>»</button>
      </div>
      <ChartBlocks recordData={yearlyData} timeUnit={'year'} />
    </>
  )
}

export default BarChartYear;
