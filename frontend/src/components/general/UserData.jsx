function UserData() {
  return (
    <>
      <div className="text-center">
        <h3 className="text-lg mb-3">運動記録</h3>

        <div role="tablist" className="tabs tabs-bordered grid-cols-3">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="今週" defaultChecked />
          <div role="tabpanel" className="tab-content p-10">
            <p>摂取カロリー(Total)</p>
            <p>消費カロリー(Total)</p>
            <p>カロリー収支</p>
          </div>

          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="今月"/>
          <div role="tabpanel" className="tab-content p-10">
            Tab content 2
          </div>

          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="全期間" />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 3
          </div>
        </div>
      </div>
    </>
  )
}

export default UserData;
