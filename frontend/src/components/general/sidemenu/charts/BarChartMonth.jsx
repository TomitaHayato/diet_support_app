import { useDispatch, useSelector } from "react-redux";
import { getMonthlyDataThunk, selectMonthlyData, selectMonthlyTotal } from "../../../../Redux/Slice/workoutRecordsSlice";
import ChartBlocks from "./ChartBlocks";
import { useState } from "react";
import dayjs from "dayjs";

function BarChartMonth() {
  const monthlyData = useSelector(selectMonthlyData);
  const monthlyTotal = useSelector(selectMonthlyTotal);
  // 何ヶ月前のデータを表示するか(1 なら 1ヶ月前)
  const [monthAgo  , setMonthAgo  ] = useState(0);
  const [targetDate, setTargetDate] = useState(dayjs());
  const dispatch = useDispatch();

  function decrementMonth() {
    setMonthAgo(prev => ++prev);
    setTargetDate(prev => prev.subtract(1, 'month'));
    dispatch(getMonthlyDataThunk(monthAgo + 1));
  }

  function incrementMonth() {
    setMonthAgo(prev => --prev);
    setTargetDate(prev => prev.add(1, 'month'));
    dispatch(getMonthlyDataThunk(monthAgo - 1));
  }

  function resetMonth() {
    setMonthAgo(0);
    setTargetDate(dayjs());
    dispatch(getMonthlyDataThunk(0));
  }

  return (
    <>
      <div className="mb-4">
        <div className="join w-full justify-center px-auto">
          <button className="join-item btn btn-info btn-sm" onClick={decrementMonth}>«</button>
          <p className="join-item px-3 flex items-center">{`${targetDate.year()}年 ${targetDate.month() + 1}月`}</p>
          <button className="join-item btn btn-info btn-sm" onClick={incrementMonth} disabled={monthAgo === 0}>»</button>
        </div>

        <div className="text-center mt-3">
          {monthAgo === 0 || <button className="btn btn-xs btn-outline" onClick={resetMonth}>今月の記録を表示</button>}
        </div>
      </div>
      <ChartBlocks recordData={monthlyData} totalData={monthlyTotal} timeUnit={'month'} />
    </>
  )
}

export default BarChartMonth;
