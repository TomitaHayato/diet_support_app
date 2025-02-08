function RadioBtnXs(props) {
  const {name, options, selectedOptions, setSelectedOptions} = props;

  return (
    <>
      {options.map((option) => {
        return (
          <div key={`${name}-${option}`}>
            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name={name} className="radio radio-xs"
                  checked={option === selectedOptions[name]}
                  onChange={ () => setSelectedOptions({...selectedOptions, [name]: option}) }/>

                <span className="text-xs">{option}</span>
              </label>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default RadioBtnXs;
