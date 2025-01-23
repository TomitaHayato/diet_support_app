export function CustomTooltip(props) {
  // eslint-disable-next-line react/prop-types
  const {label, payload, dataKey, labelUnit} = props;

  function makeDisplayValue(dataKey) {
    // eslint-disable-next-line react/prop-types
    const activeValue = payload[0]?.payload[dataKey]

    switch(dataKey) {
      case 'totalTime':
        return `${Math.floor(activeValue / 60)} 分`; // 「秒」を「分」に直す
      case 'totalBurnedCalories':
        return `${activeValue} kcal`
      default:
        return activeValue;
    }
  }

  return (
    <>
      <div className="custom-tooltip bg-blue-300 rounded-lg p-2">
        <p className="label">{`${label}${labelUnit}`}</p>
        <p className="desc">{makeDisplayValue(dataKey)}</p>
      </div>
    </>
  )
}
