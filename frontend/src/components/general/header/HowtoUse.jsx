export default function HowToUse() {
  const heightLightStyle = "text-blue-500"

  return(
    <>
      <h3 className="font-bold text-xl md:text-2xl text-center mb-3">アプリの使い方</h3>

      <div className="text-xs sm:text-sm">
        <p className="py-3 px-4 text-center">「消費したいカロリー」と「現在の体重」から、<br />必要な運動時間を計算します。</p>

        <div className="rounded-lg border py-4 px-1 md:px-8 border-gray-500 mb-5">
          <ul className="px-4 list-decimal">
            <li className="py-3">
              <span className={heightLightStyle}>消費したいカロリー</span>と
              <span className={heightLightStyle}>あなたの体重</span>を入力し、「調べる」をClickしましょう。
              <p className="mt-1">運動一覧とカロリーを消費するために必要な運動時間が表示されます</p>
            </li>

            <li className="py-3">取り組む運動を選び、「Workout!!」をClickしましょう</li>

            <li className="py-3">「スタート」を押して、運動を開始！ または、直接運動時間を入力します</li>

            <li className="py-3">運動時間に応じて、消費カロリーが計算されます。目標時間を目指して取り組みましょう！</li>
          </ul>
        </div>
        

        <div className="rounded-lg border py-4 px-1 md:px-8 border-gray-500">
          <h3 className="px-4 md:px-0">ログイン後に使える機能</h3>
          <ul className="list-disc px-4">
            <li className="py-3">
              運動に取り組んだ時間や消費カロリーを
              <span className="text-blue-500 font-semibold">記録</span>
              できます。
            </li>

            <li className="py-3">
              運動を<span className="text-blue-500 font-semibold">お気に入り登録</span>して、すぐに取り組むことができます
            </li>
          </ul>
        </div>
        
      </div>
           
    </>
  )
}
