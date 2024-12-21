import BarChartTemplate from "./BarChartTemplate";

function DataCharts() {
  return (
    <>
      <div className="text-center">
        <div className="collapse collapse-arrow">
          <input type="checkbox" />
          <h3 className="collapse-title text-lg font-medium">記録</h3>
          <div className="collapse-content px-0">
            <div role="tablist" className="tabs tabs-bordered grid-cols-3">
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="今週" defaultChecked />
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">消費カロリー</h3>
                  <BarChartTemplate />
                </div>

                <div className="mb-5">
                  <h3>運動時間</h3>
                  <BarChartTemplate />
                </div>

              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="今月"/>
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">消費カロリー</h3>
                  <BarChartTemplate />
                </div>

                <div className="mb-5">
                  <h3>運動時間</h3>
                  <BarChartTemplate />
                </div>
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="全期間" />
              <div role="tabpanel" className="tab-content pt-5">
                <div className="mb-5">
                  <h3 className="text-center">消費カロリー</h3>
                  <BarChartTemplate />
                </div>

                <div className="mb-5">
                  <h3>運動時間</h3>
                  <BarChartTemplate />
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
