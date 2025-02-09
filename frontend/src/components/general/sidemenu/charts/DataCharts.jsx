import BarChartYear from "./BarChartYear";
import BarChartWeek from "./BarChartWeek";
import BarChartMonth from "./BarChartMonth";

function DataCharts() {
  return (
    <>
      <div className="text-center">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <h3 className="collapse-title text-lg font-medium flex items-center justify-center">
            期間ごとのデータ
            <i className="i-lucide-bar-chart-4 text-blue-600 ml-2"/>
          </h3>
          <div className="collapse-content px-0">
            <div role="tablist" className="tabs tabs-bordered grid-cols-3">
              {/* 今週のチャート */}
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="週間" defaultChecked />
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">
                    <i className="i-lucide-flame text-orange-500"/>
                    消費カロリー
                  </h3>
                  <BarChartWeek dataKey={"totalBurnedCalories"}/>
                </div>

                <div className="mb-5">
                  <h3>
                    <i className="i-lucide-bike text-green-500 mr-1"/>
                    運動時間
                  </h3>
                  <BarChartWeek dataKey={"totalTime"}/>
                </div>

              </div>
              {/* 今月のチャート */}
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="月間"/>
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">
                    <i className="i-lucide-flame text-orange-500"/>
                    消費カロリー
                  </h3>
                  <BarChartMonth dataKey={"totalBurnedCalories"}/>
                </div>

                <div className="mb-5">
                  <h3>
                    <i className="i-lucide-bike text-green-500 mr-1"/>
                    運動時間
                  </h3>
                  <BarChartMonth dataKey={"totalTime"}/>
                </div>
              </div>
              {/* 年ごとのチャート */}
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="年間" />
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">
                    <i className="i-lucide-flame text-orange-500"/>
                    消費カロリー
                  </h3>
                  <BarChartYear dataKey={"totalBurnedCalories"}/>
                </div>

                <div className="mb-5">
                  <h3>
                    <i className="i-lucide-bike text-green-500 mr-1"/>
                    運動時間
                  </h3>
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
