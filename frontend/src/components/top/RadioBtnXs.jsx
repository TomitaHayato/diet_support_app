function RadioBtnXs(props) {
  const {name, options, selectedOptions, setSelectedOptions} = props;

  return (
    <>
      {options.map((value) => {
        return (
          <div key={`${name}-${value}`}>
            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name={name} className="radio radio-xs"
                  checked={value === selectedOptions[name]}
                  onChange={ () => setSelectedOptions({...selectedOptions, [name]: value}) }/>

                <span className="text-xs">{value}</span>
              </label>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default RadioBtnXs;
