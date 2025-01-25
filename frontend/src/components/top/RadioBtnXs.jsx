function RadioBtnXs(props) {
  const {name, value, options, selectedTags, setSelectedTags} = props;

  function inputRadioData() {
    let newSelectedTags = [...selectedTags];

    const otherOptions = options.filter(option => option !== value && option !== '指定なし') // この選択肢以外の選択肢

    newSelectedTags = newSelectedTags.filter(el => !otherOptions.includes(el));  // 指定された選択肢以外の選択肢をtargetTagsから外す
    if(value !== '指定なし') {
      if(!newSelectedTags.includes(value)) newSelectedTags.push(value); // 指定された選択肢をtargetTagsに格納
    }
    setSelectedTags(newSelectedTags);
  }

  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer gap-2 justify-start">
          <input type="radio" name={name} className="radio radio-xs" defaultChecked={value === '指定なし'}
            onChange={inputRadioData}/>
          <span className="text-xs">{value}</span>
        </label>
      </div>
    </>
  )
}

export default RadioBtnXs;
