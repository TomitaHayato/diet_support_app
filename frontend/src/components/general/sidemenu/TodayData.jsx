import { secondsToMMSS } from "../../../utils/integerStyle";
import { useSelector } from "react-redux";
import { selectTodayData } from "../../../Redux/Slice/workoutRecordsSlice";

function TodayData() {
  const todayData = useSelector(selectTodayData);

  return (
    <>
      <div className="text-center">
        <h3 className="text-gray-500 font-semibold mb-3">今日のデータ</h3>

        <div className="stats border border-primary shadow mb-2">
          <div className="stat">
            <div className="stat-figure text-primary">
              <i className="i-lucide-bike size-5"/>
            </div>

            <div className="stat-title text-sm">運動時間</div>
            <div className="stat-value text-xl text-primary">
              {secondsToMMSS(todayData.totalTime)}
            </div>
          </div>
        </div>

        <div className="stats border border-primary shadow">
          <div className="stat">
            <div className="stat-title text-sm">消費カロリー</div>
            <div className="stat-value text-lg text-primary">
              {todayData.totalBurnedCalories} kcal
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-sm">摂取カロリー</div>
            <div className="stat-value text-lg text-primary">
              {todayData.totalIntakedCalories} kcal
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodayData;
