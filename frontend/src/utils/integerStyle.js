// 秒数をMM:SSの文字列変換する
export function secondsToMMSS(sec) {
  const minutes = Math.floor(sec / 60)
  const seconds = sec % 60

  if(minutes > 0) {
    return `${zeroPadding(minutes)}分 ${zeroPadding(seconds)}秒`;
  } else {
    return `${zeroPadding(seconds)}秒`;
  }
}

// 数値が1桁の場合、ゼロパディングする
function zeroPadding(num) {
  return String(num).padStart(2, '0');
}
