import RecordChart from "./RecordChart";

function ChartBlocks(props) {
  const {recordData, timeUnit} = props;

  return (
    <>
      {/* カロリーのChart */}
      <div className="mb-5">
        <h3 className="text-center">
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
        <h3 className="text-center">
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
