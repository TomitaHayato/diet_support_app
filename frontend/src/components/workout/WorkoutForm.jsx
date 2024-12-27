function WorkoutForm(props) {
  // eslint-disable-next-line react/prop-types
  const {intakedCalorie} = props;

  return (
    <>
      <div className="border border-primary rounded-xl p-5">
        <p className="mb-5 text-info text-xl">運動時間を直接入力する</p>

        <div className="mb-5">
          <p>摂取カロリー：
            <span className="text-lg font-semibold">{` ${intakedCalorie} `}</span>
            kcal
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-3">
          <input type="number" className="input input-bordered"/>
          <span className="">分</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3 text-gray-500">
          <span className="">消費カロリー</span>
          {/* 入力された運動時間から、消費カロリーを求めて表示 */}
          <span className="text-lg text-info">{0}</span>
          <span>kcal</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3 text-gray-500">
          <span className="">残りカロリー</span>
          {/* 摂取カロリーから消費カロリーを引いた値を動的に表示 */}
          <span className="text-lg text-error">{0}</span>
          <span>kcal</span>
        </div>
        
        {/* 運動時間&消費カロリーを保存 => フォームの値を0にする */}
        <button className="btn btn-wide btn-success rounded-xl mb-5">保存</button>

        <div className="text-gray-500 w-3/12 mx-auto">
            <p className="text-sm">以下のデータを保存します</p>
            <ul className="text-sm text-start">
              <li>・運動時間</li>
              <li>・消費カロリー</li>
              <li>・未消費カロリー</li>
              <li>・摂取カロリー</li>
              <li className="text-xs">(消費カロリー＋未消費カロリー)</li>
            </ul>
          </div>
      </div>
    </>
  )
}

export default WorkoutForm;
