function Header() {
  return (
    <>
      <div data-testid="app-intro" className="grid grid-cols-4 p-3 bg-base-200 border border-gray-500 rounded-lg">
        <span className="order-1">
          <img src="/icon.png" className="max-w-20" />
        </span>

        <div className="col-span-2 order-2 text-center">
          <h3 className="mb-2 font-bold text-lg">カロリー管理をサポートします！！</h3>

          <p className="text-sm">
            体重と消費したいカロリーを入力するだけで<br />
            必要な運動時間を簡単に計算できます！</p>
        </div>

        <span className="order-4"></span>
      </div>

      <p className="text-xs pt-4 text-end">
        参考： 厚生労働省「健康づくりのための身体活動・運動ガイド2023」
      </p>
    </>
  )
}

export default Header;
