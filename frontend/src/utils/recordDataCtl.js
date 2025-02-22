// Chart上の値を適切な表示に変更する
export function unitChange(dataKey, recordVal) {
  switch(dataKey) {
    case 'totalTime':
      return secToMin(recordVal); // 「秒」を「分」に直す
    case 'totalBurnedCalories':
      return kcalStrPlus(recordVal);
    default:
      return recordVal;
  }
}

export function secToMin(sec) {
  return `${Math.floor(sec / 60)} 分`;
}

export function kcalStrPlus(kcal) {
  return `${kcal} kcal`;
}