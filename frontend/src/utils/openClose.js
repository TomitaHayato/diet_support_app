// 要素の表示・非表示を操作
export function openEl(el) {
  if(el.classList.contains('hidden')) el.classList.remove('hidden');
}

export function closeEl(el) {
  if(el.classList.contains('hidden')) return;

  el.classList.add('hidden');
}

export function openAndCloseEl(el) {
  if(el.classList.contains('hidden')) {
    el.classList.remove('hidden')
  } else {
    el.classList.add('hidden');
  }
}
