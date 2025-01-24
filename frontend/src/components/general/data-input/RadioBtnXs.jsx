function RadioBtnXs(props) {
  // eslint-disable-next-line react/prop-types
  const {name, value} = props;

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer gap-2 justify-start">
          <input type="radio" name={name} className="radio radio-xs" />
          <span className="text-xs">{value}</span>
        </label>
      </div>
    </>
  )
}

export default RadioBtnXs;