import { useContext } from "react";
import { SideMenuContext } from "../../../Contexts/Contexts";
import { secondsToMMSS } from "../../../utils/integerStyle";

function TodayData() {
  const {todayData} = useContext(SideMenuContext);

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
              {secondsToMMSS(todayData[0].totalTime)}
            </div>
          </div>
        </div>

        <div className="stats border border-primary shadow">
          <div className="stat">
            <div className="stat-title text-sm">消費カロリー</div>
            <div className="stat-value text-lg text-primary">
              {todayData[0].totalBurnedCalories} kcal
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-sm">摂取カロリー</div>
            <div className="stat-value text-lg text-primary">
              {todayData[0].totalIntakedCalories} kcal
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodayData;
