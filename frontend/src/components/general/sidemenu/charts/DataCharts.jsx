import BarChartYear from "./BarChartYear";
import BarChartWeek from "./BarChartWeek";
import BarChartMonth from "./BarChartMonth";

function DataCharts(props) {
  const { tabName="my_tab" } = props;

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered grid-cols-3">
        {/* 今週のチャート */}
        <input type="radio" name={tabName} role="tab" className="tab text-base" aria-label="週間" defaultChecked />
        <div role="tabpanel" className="tab-content pt-5">
          <BarChartWeek />
        </div>

        {/* 今月のチャート */}
        <input type="radio" name={tabName} role="tab" className="tab text-base" aria-label="月間"/>
        <div role="tabpanel" className="tab-content pt-5">
          <BarChartMonth />
        </div>

        {/* 年ごとのチャート */}
        <input type="radio" name={tabName} role="tab" className="tab text-base" aria-label="年間" />
        <div role="tabpanel" className="tab-content pt-5">
          <BarChartYear />
        </div>
      </div>
    </>
  )
}

export default DataCharts;
