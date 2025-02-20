// 渡されるデータはobjのオブジェクトを要素にもつ配列
// objObj: {id:, name:, tagList: [...]}のような形式

import { putDev } from "./devTool";

// nameの部分一致検索
export function nameSearch(objArray=[], inputWords='') {
  if(inputWords === '') return objArray; // 検索ワードがない場合は全てのobjを返す。

  let filteredObjs = [...objArray];

  inputWords.split(/\s+/).forEach(word => {
    filteredObjs = filteredObjs.filter(obj => obj?.name.indexOf(word) !== -1);
  })
  putDev(filteredObjs);
  return filteredObjs;
}

// tag条件から絞り込み
// filterQueryの例: { "イージー", "アウトドア" }
export function tagFilter(objArray=[], filterQuery=[]) {
  if(filterQuery.length === 0) return objArray;

  const filteredObjs = [];

  // filterQueryに格納された全てのtagをtagListに含むobjのみを返す
  objArray.forEach(obj => {
    if( filterQuery.every(el => obj.tagList.includes(el)) ) filteredObjs.push(obj);
  })

  return filteredObjs;
}

// 検索＋絞り込みを同時に行う
export function searchAndFilter(objArray=[], inputWords='', filterQuery=[]) {
  return tagFilter(nameSearch(objArray, inputWords), filterQuery);
}

// 選択した絞り込み用の選択肢から'指定なし'を抜く
export function removeUnspecified(selectedOptions) {
  return Object.values(selectedOptions).filter(val => val !== '指定なし');
}
