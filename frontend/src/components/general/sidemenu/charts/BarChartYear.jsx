import { useDispatch, useSelector } from "react-redux";
import { getYearlyDataThunk, selectYearlyData } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";
import { useState } from "react";
import dayjs from "dayjs";

function BarChartYear() {
  const dispatch   = useDispatch();
  const yearlyData = useSelector(selectYearlyData);
  const [yearsAgo  , setYearsAgo  ] = useState(0);
  const [targetDate, setTargetDate] = useState(dayjs());

  function decrementYear() {
    setYearsAgo(prev => ++prev);
    setTargetDate(prev => prev.subtract(1, 'year'));
    dispatch(getYearlyDataThunk(yearsAgo + 1));
  }

  function incrementYear() {
    setYearsAgo(prev => --prev);
    setTargetDate(prev => prev.add(1, 'year'));
    dispatch(getYearlyDataThunk(yearsAgo - 1));
  }

  function resetYear() {
    setYearsAgo(0);
    setTargetDate(dayjs());
    dispatch(getYearlyDataThunk(0));
  }

  return (
    <>
      <div className="mb-4">
        <div className="join w-full justify-center px-auto">
          <button className="join-item btn btn-info btn-sm" onClick={decrementYear}>«</button>
          <p className="join-item px-3 flex items-center">{targetDate.year()}年</p>
          <button className="join-item btn btn-info btn-sm" onClick={incrementYear} disabled={yearsAgo === 0}>»</button>
        </div>

        <div className="text-center mt-3">
          {yearsAgo === 0 || <button className="btn btn-xs btn-outline" onClick={resetYear}>今年の記録を表示</button>}
        </div>
      </div>
      
      <ChartBlocks recordData={yearlyData} timeUnit={'year'} />
    </>
  )
}

export default BarChartYear;
