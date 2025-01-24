// input要素の入力値を空にする
export function resetInput(inputEl) {
  if(inputEl.value === '') return '';

  inputEl.value = ''

  return inputEl.value;
}

// ボタンの連打防止
export function btnOff(btnEl) {
  btnEl.disabled = true;
}

export function btnOn(btnEl) {
  btnEl.disabled = false;
}
