import { secondsToMMSS } from "../../../../utils/integerStyle";
import RecordChart from "./RecordChart";

function ChartBlocks(props) {
  const {recordData, totalData, timeUnit} = props;

  return (
    <>
      <div className="my-5 text-center">
        <div className="stats stats-horizontal shadow w-full border border-primary grid">
          <div className="stat px-4 lg:px-2 gap-x-0 border-primary">
            <div className="stat-figure text-success">
              <i className="i-lucide-bike size-5"/>
            </div>
            <div className="stat-title text-sm">運動時間</div>
            <div className="stat-value text-base">{secondsToMMSS(totalData.totalTime)}</div>
          </div>

          <div className="stat px-4 gap-x-0 border-primary">
            <div className="stat-figure text-error">
              <i className="i-lucide-flame size-5"/>
            </div>
            <div className="stat-title text-sm">消費カロリー</div>
            <div className="stat-value text-base">{totalData.totalBurnedCalories} kcal</div>
          </div>
        </div>
      </div>

      {/* カロリーのChart */}
      <div className="mb-5">
        <h3 className="text-center font-semibold">
          <i className="i-lucide-flame text-orange-500"/>
          消費カロリー
        </h3>
        
        <RecordChart
          dataKey={"totalBurnedCalories"}
          recordData={recordData}
          timeUnit={timeUnit}/>
      </div>

      {/* 運動時間のChart */}
      <div className="mb-5">
        <h3 className="text-center font-semibold">
          <i className="i-lucide-bike text-green-500 mr-1"/>
          運動時間
        </h3>

        <RecordChart
          dataKey={"totalTime"}
          recordData={recordData}
          timeUnit={timeUnit}/>
      </div>
    </>
  )
}

export default ChartBlocks;
