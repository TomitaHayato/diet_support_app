function Header() {
  return (
    <>
      <div data-testid="app-intro" className="grid grid-cols-8 px-3 py-2 bg-base-200 border border-base-200 rounded-lg">
        <span className="order-1">
          <img src="/icon.png" className="max-w-8 md:max-w-12" />
        </span>

        <div className="col-span-6 order-2 text-center my-auto justify-items-stretch">

          <p className="text-[0.65rem] lg:text-base">
            カロリーを消費するのに必要な運動時間を計算できます！</p>
          <p className="text-[0.5rem] lg:text-xs pt-1">
            参考： 厚生労働省「健康づくりのための身体活動・運動ガイド2023」
          </p>
        </div>

        <span className="order-8"></span>
      </div>
    </>
  )
}

export default Header;
