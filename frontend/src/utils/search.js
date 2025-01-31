// 渡されるデータはobjのオブジェクトを要素にもつ配列
// objObj: {id:, name:, tagList: [...]}のような形式

// nameの部分一致検索
export function nameSearch(objArray=[], inputWords='') {
  if(inputWords === '') return objArray; // 検索ワードがない場合は全てのobjを返す。

  let filteredObjs = [...objArray];

  inputWords.split(/\s+/).forEach(word => {
    filteredObjs = filteredObjs.filter(obj => obj?.name.indexOf(word) !== -1);
  })
  // console.log(filteredObjs);
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
