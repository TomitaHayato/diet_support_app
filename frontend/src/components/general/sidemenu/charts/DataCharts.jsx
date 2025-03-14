import BarChartYear from "./BarChartYear";
import BarChartWeek from "./BarChartWeek";
import BarChartMonth from "./BarChartMonth";

function DataCharts() {
  return (
    <>
      <div role="tablist" className="tabs tabs-bordered grid-cols-3">
        {/* 今週のチャート */}
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="週間" defaultChecked />
        <div role="tabpanel" className="tab-content pt-5">
          <BarChartWeek />
        </div>

        {/* 今月のチャート */}
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="月間"/>
        <div role="tabpanel" className="tab-content pt-5">
          <BarChartMonth />
        </div>

        {/* 年ごとのチャート */}
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="年間" />
        <div role="tabpanel" className="tab-content pt-5">
          <BarChartYear />
        </div>
      </div>
    </>
  )
}

export default DataCharts;
