function Header() {
  return (
    <>
      <div data-testid="app-intro" className="text-center p-3 bg-base-200 border border-gray-500 rounded-lg">
        <h3 className="mb-2 font-bold">カロリー管理をサポートします！！</h3>

        <p className="text-sm">体重と消費したいカロリーを入力するだけで、必要な運動時間を簡単に計算できます！</p>
      </div>
    </>
  )
}

export default Header;
