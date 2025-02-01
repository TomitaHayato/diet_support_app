import { useContext, useEffect, useState } from "react";
import { btnOff, btnOn } from "../../utils/formCtl";
import { closeEl, openAndCloseEl } from "../../utils/openClose";
import RadioBtnXs from "./RadioBtnXs";
import { FilterWorkoutsContext } from "../../Contexts/Contexts";

const defaultSelectedOptions = {'num': '指定なし', 'place': '指定なし', 'difficulty': '指定なし'};

function SearchForm(props) {
  const {workoutsObj} = props;

  const {setSearchWords, setFilterQuery} = useContext(FilterWorkoutsContext);

  const [inputWords     , setInputWords     ] = useState(''); // 検索Formの入力値 =>「検索」ボタンClickでsearchWordsにset
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);

  // 検索・絞り込みクエリを反映
  function runSearch() {
    setSearchWords(inputWords);
    const newFilterQuery = Object.values(selectedOptions).filter(val => val !== '指定なし')
    setFilterQuery(newFilterQuery);
  }

  useEffect(() => runSearch(), [workoutsObj]); // apiからWorkoutデータを取得した際、検索クエリを反映

  return (
    <>
      <div className="flex justify-end gap-8">
        {/* 検索フォーム */}
        <div className="join">
          <label className="input input-sm input-bordered flex items-center gap-2 join-item">
            <input type="text" id="searchInput" className="grow" placeholder="運動名で検索"
              value={inputWords}
              onChange={(e) => setInputWords(e.target.value)} />

            <button className="btn btn-xs btn-circle btn-ghost" onClick={() => setInputWords('')}>
              <i className="i-uiw-close"/>
            </button>
          </label>

          <button
            className="btn btn-sm join-item rounded-r-lg text-gray-800 bg-amber-300 hover:bg-amber-200"
            onClick={(e) => {
              btnOff(e.target);
              runSearch();
              btnOn(e.target);
            }}
          >検索<i className="i-uiw-search"/></button>
        </div>

        {/* 絞り込み */}
        <div>
          <button className="btn btn-sm btn-outline" onClick={() => openAndCloseEl(document.querySelector('#filterBox'))}>
            絞り込み<i className="i-uiw-filter"/>
          </button>
        </div>
      </div>

      <div id="filterBox" className="hidden mt-4 p-4 rounded-lg shadow-xl border border-gray-500/50">
        <div className="flex items-start justify-end gap-4">
          {/* 難易度 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">難易度</p>
            <RadioBtnXs
              name={'difficulty'}
              options={['指定なし', 'イージー', 'ハード']}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions} />
          </div>

          {/* 場所 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">場所</p>
            <RadioBtnXs
              name={'place'}
              options={['指定なし', '家でできる', 'アウトドア']}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}/>
          </div>

          {/* 人数 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">人数</p>
            <RadioBtnXs
              name={'num'}
              options={['指定なし', 'ひとりで', 'だれかと']}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}/>
          </div>

          <div className="flex flex-col gap-4">
            <button className="btn btn-xs btn-circle btn-ghost ml-auto" onClick={() => closeEl(document.querySelector('#filterBox'))}>
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>

            <button className="btn btn-xs btn-outline" onClick={(e) => {
              btnOff(e.target);
              runSearch();
              btnOn(e.target);
            }}>この条件で検索</button>

            <button className="btn btn-xs btn-outline" onClick={e => {
              btnOff(e.target);
              setSelectedOptions(defaultSelectedOptions);
              btnOn(e.target);
            }}>リセット</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchForm;
