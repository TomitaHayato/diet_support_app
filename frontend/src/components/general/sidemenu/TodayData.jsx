import { secondsToMMSS } from "../../../utils/integerStyle";
import { useSelector } from "react-redux";
import { selectTodayData } from "../../../Redux/Slice/workoutRecordsSlice";
import { selectTheme } from "../../../Redux/Slice/ThemeSlice";
import { grayText } from "../../../utils/style";

function TodayData() {
  const todayData = useSelector(selectTodayData);
  const theme     = useSelector(selectTheme);  

  return (
    <>
      <div className="text-center">
        <h3 className={`${grayText(theme)} font-semibold mb-3`}>今日のデータ</h3>

        <div className="stats border border-primary shadow mb-2">
          <div className="stat">
            <div className="stat-figure text-primary">
              <i className="i-lucide-bike size-5"/>
            </div>

            <p className="stat-title text-sm">運動時間</p>
            <p className="stat-value text-xl text-primary" role="today-data" aria-label="totalTime">
              {secondsToMMSS(todayData.totalTime)}
            </p>
          </div>
        </div>

        <div className="stats border border-primary shadow">
          <div className="stat">
            <p className="stat-title text-sm">消費カロリー</p>
            <p className="stat-value text-lg text-primary" role="today-data" aria-label="totalBurnedCalories">
              {todayData.totalBurnedCalories} kcal
            </p>
          </div>

          <div className="stat">
            <p className="stat-title text-sm">摂取カロリー</p>
            <p className="stat-value text-lg text-primary" role="today-data" aria-label="totalIntakedCalories">
              {todayData.totalIntakedCalories} kcal
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodayData;
