export const defaultSelectedOptions = () => {
  return {
    'num':      '指定なし',
    'place':    '指定なし',
    'strength': '指定なし',
    'type':     '指定なし',
  };
}

export const strengthOptions = () => ['指定なし', '低強度', '中強度', '高強度', '非常に高強度'];

export const placeOptions = () => ['指定なし', '家でできる', 'アウトドア'];

export const typeOptions = () => ['指定なし', '運動', '生活動作']; 

export const numOptions = () => ['指定なし', 'ひとりで', 'だれかと'];

export const tagTitleOptions = (name) => {
  let obj = {
    title: '',
    options: []
  };

  switch (name) {
    case 'strength':
      obj.options = strengthOptions();
      obj.title = '運動の強度'
      break;
    case 'place':
      obj.options = placeOptions();
      obj.title = '場所'
      break;
    case 'num':
      obj.options = numOptions();
      obj.title = '人数'
      break;
    case 'type':
      obj.options = typeOptions();
      obj.title = '運動の種類'
      break;
  }

  return obj;
}
