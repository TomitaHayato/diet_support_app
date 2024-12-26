import { useContext } from "react";
import BarChartYear from "./BarChartYear";
import AuthContext from "../../Contexts/AuthContext";
import BarChartWeek from "./BarChartWeek";
import BarChartMonth from "./BarChartMonth";

function DataCharts() {
  const {yearlyData, monthlyData, weeklyData, todayData} = useContext(AuthContext);
  console.log(yearlyData);
  console.log(monthlyData);
  console.log(weeklyData);
  console.log(todayData); //todayDataは後で消す

  return (
    <>
      <hr className="mb-3 border-gray-400"/>

      <div className="text-center">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <h3 className="collapse-title text-lg font-medium">記録</h3>
          <div className="collapse-content px-0">
            <div role="tablist" className="tabs tabs-bordered grid-cols-3">
              {/* 今週のチャート */}
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="今週" defaultChecked />
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">消費カロリー</h3>
                  <BarChartWeek dataKey={"totalBurnedCalories"}/>
                </div>

                <div className="mb-5">
                  <h3>運動時間</h3>
                  <BarChartWeek dataKey={"totalTime"}/>
                </div>

              </div>
              {/* 今月のチャート */}
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="今月"/>
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">消費カロリー</h3>
                  <BarChartMonth dataKey={"totalBurnedCalories"}/>
                </div>

                <div className="mb-5">
                  <h3>運動時間</h3>
                  <BarChartMonth dataKey={"totalTime"}/>
                </div>
              </div>
              {/* 年ごとのチャート */}
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="全期間" />
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">消費カロリー</h3>
                  <BarChartYear dataKey={"totalBurnedCalories"}/>
                </div>

                <div className="mb-5">
                  <h3>運動時間</h3>
                  <BarChartYear  dataKey={"totalTime"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataCharts;
