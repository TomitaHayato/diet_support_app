import { useDispatch, useSelector } from "react-redux";
import { getWeeklyDataThunk, selectWeeklyData, selectWeeklyTotal } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";
import { useState } from "react";
import dayjs from "dayjs";

function BarChartWeek() {
  const weeklyData  = useSelector(selectWeeklyData);
  const weeklyTotal = useSelector(selectWeeklyTotal);
  const [weeksAgo  , setWeeksAgo  ] = useState(0);
  const [targetDate, setTargetDate] = useState(dayjs());
  const dispatch = useDispatch();

  const startOfWeek = targetDate.startOf('week');
  const endOfWeek   = targetDate.endOf('week');

  function decrementWeek() {
    setWeeksAgo(prev => ++prev);
    setTargetDate(prev => prev.subtract(1, 'week'));
    dispatch(getWeeklyDataThunk(weeksAgo + 1));
  }

  function incrementWeek() {
    setWeeksAgo(prev => --prev);
    setTargetDate(prev => prev.add(1, 'week'));
    dispatch(getWeeklyDataThunk(weeksAgo - 1));
  }

  function resetWeek() {
    setWeeksAgo(0);
    setTargetDate(dayjs());
    dispatch(getWeeklyDataThunk(0));
  }


  return (
    <>
      <div className="mb-4">
        <div className="join w-full justify-center px-auto lg:text-sm">
          <button className="join-item btn btn-info btn-sm" onClick={decrementWeek}>«</button>
          <p className="join-item px-3 flex items-center">
            {`${startOfWeek.year()}/${startOfWeek.month() + 1}/${startOfWeek.date()}(日) ~ ${endOfWeek.year()}/${endOfWeek.month() + 1}/${endOfWeek.date()}(土)`}
          </p>
          <button className="join-item btn btn-info btn-sm" onClick={incrementWeek} disabled={weeksAgo === 0}>»</button>
        </div>

        <div className="text-center mt-3">
          {weeksAgo === 0 || <button className="btn btn-xs btn-outline" onClick={resetWeek}>今週の記録を表示</button>}
        </div>
      </div>

      <ChartBlocks recordData={weeklyData} totalData={weeklyTotal} timeUnit={'week'} />
    </>
  )
}

export default BarChartWeek;
