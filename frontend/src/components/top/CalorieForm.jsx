function CalorieForm(props) {
  // eslint-disable-next-line react/prop-types
  const {intakedCalorie, setIntakedCalorie, weight, setWeight, fetchWorkoutsData} = props;

  return (
    <>
      <div className="">
        <div className='flex gap-4 justify-center'>
          <div className='tooltip' data-tip="摂取カロリー（整数）">
            <label className="input input-primary input-bordered flex items-center gap-2">
              <span className='text-gray-400'>kcal</span>
              <input type="number" className="grow" min={0} value={intakedCalorie} onChange={(e) => setIntakedCalorie(e.target.value)} />
            </label>
          </div>

          <div className='tooltip' data-tip="体重（整数）">
            <label className="input input-primary input-bordered flex items-center gap-2">
              <span className='text-gray-400'>kg</span>
              <input type="number" className="grow" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} />
            </label>
          </div>

          <button className='btn btn-primary' onClick={fetchWorkoutsData}>調べる</button>
        </div>
      </div>
    </>
  )
}

export default CalorieForm;
