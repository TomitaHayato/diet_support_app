function TodayData() {
  return (
    <>
      <hr className="mb-3 border-gray-400"/>
      
      <div className="text-center">
        <h3 className="text-gray-500 font-semibold mb-3">今日のデータ</h3>

        <div className="stats border border-primary shadow mb-2">
          <div className="stat">
            <div className="stat-figure text-primary">
              <i className="i-lucide-bike size-5"/>
            </div>

            <div className="stat-title text-sm">運動時間</div>
            <div className="stat-value text-xl text-primary">{"00"}分{"00"}秒</div>
          </div>
        </div>

        <div className="stats border border-primary shadow">
          <div className="stat">
            <div className="stat-title text-sm">消費カロリー</div>
            <div className="stat-value text-lg text-primary">{"100"} kcal</div>
          </div>

          <div className="stat">
            <div className="stat-title text-sm">摂取カロリー</div>
            <div className="stat-value text-lg text-primary">{"100"} kcal</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodayData;
