function WorkoutForm() {
  return (
    <>
      <div className="border border-primary rounded-xl p-5">
        <p className="mb-5 text-info text-xl">運動時間を直接入力する</p>

        <div className="flex justify-center items-center gap-2 mb-3">
          <input type="number" className="input input-bordered"/>
          <span className="">分</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3">
          <span className="text-gray-400">[ 消費カロリー</span>
          {/* 入力された運動時間から、消費カロリーを求めて表示 */}
          <span className="text-lg text-info">{0}</span>
          <span>kcal ]</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3">
          <span className="text-gray-400">[ 残りカロリー</span>
          {/* 摂取カロリーから消費カロリーを引いた値を動的に表示 */}
          <span className="text-lg text-error">{0}</span>
          <span>kcal ]</span>
        </div>
        
        {/* 運動時間&消費カロリーを保存 => フォームの値を0にする */}
        <button className="btn btn-wide btn-success rounded-xl">保存</button>
      </div>
    </>
  )
}

export default WorkoutForm;
