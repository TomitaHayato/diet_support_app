import { tagTitleOptions } from "../../utils/workoutTags";

function RadioBtnXs(props) {
  const {name, selectedOptions, setSelectedOptions} = props;

  const titleOptions = tagTitleOptions(name);

  if(titleOptions.options.length === 0 || titleOptions.title === '') return;

  return (
    <>
      <div className="px-4 border-r border-gray-500">
        <p className="text-sm mb-2">{titleOptions.title}</p>
        {titleOptions.options.map((option) => {
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
      </div>
    </>
  )
}

export default RadioBtnXs;
