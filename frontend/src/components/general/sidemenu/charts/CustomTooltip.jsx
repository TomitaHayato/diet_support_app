import { unitChange } from "../../../../utils/recordDataCtl";

export function CustomTooltip(props) {
  const {label, payload, dataKey, labelUnit} = props;

  function makeDisplayValue(dataKey) {
    const hoveredRecordVal = payload[0]?.payload[dataKey]

    return unitChange(dataKey, hoveredRecordVal);
  }

  return (
    <>
      <div className="custom-tooltip bg-blue-300 text-gray-800 rounded-lg p-2">
        <p className="label">{`${label}${labelUnit}`}</p>
        <p className="desc">{makeDisplayValue(dataKey)}</p>
      </div>
    </>
  )
}
