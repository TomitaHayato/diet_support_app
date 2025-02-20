import { useEffect, useState } from "react";
import { btnOff, btnOn } from "../../utils/formCtl";
import RadioBtnXs from "./RadioBtnXs";
import { defaultSelectedOptions, numOptions, placeOptions, strengthOptions, typeOptions } from "../../utils/workoutTags";
import { removeUnspecified, searchAndFilter } from "../../utils/search";
import AutoComplete from "./AutoComplete";

function SearchForm(props) {
  const {workoutsObj, autoCompleteList ,setAutoCompleteList, setSearchWords, setFilterQuery} = props;

  const [inputWords     , setInputWords     ] = useState(''); // 検索Formの入力値 =>「検索」ボタンClickでsearchWordsにset
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);
  // 検索FormがActiveかどうか
  const [isFormActive, setIsFormActive] = useState(false);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

  // 検索・絞り込みクエリを反映
  function settingSearchQuery() {
    setSearchWords(inputWords);
    setFilterQuery(
      removeUnspecified(selectedOptions)
    );
  }

  useEffect(() => settingSearchQuery(), [workoutsObj]); // apiからWorkoutデータを取得した際、検索クエリを反映

  // 入力値が変更 => オートコンプリート候補を更新
  useEffect(() => {
    setAutoCompleteList(
      searchAndFilter(
        workoutsObj,
        inputWords,
        removeUnspecified(selectedOptions),
      )
    );
  }, [inputWords, selectedOptions, setAutoCompleteList, workoutsObj]);

  return (
    <>
      <div className="flex justify-end gap-8">
        {/* 検索フォーム */}
        <div className="flex flex-col">
          <div className="join">
            <label className="input input-sm input-bordered flex items-center gap-2 join-item">
              <input type="text" id="searchInput" className="grow" placeholder="運動名で検索"
                value={inputWords}
                onChange={(e) => setInputWords(e.target.value)}
                onFocus={() => setIsFormActive(true)}
                onBlur={() => setIsFormActive(false)} />

              <button className="btn btn-xs btn-circle btn-ghost" onClick={() => setInputWords('')}>
                <i className="i-uiw-close"/>
              </button>
            </label>

            <button
              className="btn btn-sm join-item rounded-r-lg text-gray-800 bg-amber-300 hover:bg-amber-200"
              onClick={(e) => {
                btnOff(e.target);
                settingSearchQuery();
                btnOn(e.target);
              }}
            ><i className="i-uiw-search"/></button>
          </div>

          {/* オートコンプリート */}
          <div className="relative">
            {(autoCompleteList.length === workoutsObj.length) || (autoCompleteList.length === 0) || (!isFormActive) ?
              false :
              <AutoComplete
                autoCompleteList={autoCompleteList}
                setInputWords={setInputWords} />}
          </div>
        </div>

        {/* 絞り込み */}
        <div>
          <button className="btn btn-sm btn-outline" onClick={() => {
            setIsFilterBoxOpen(prev => !prev)
          }}>
            絞り込み<i className="i-uiw-filter"/>
          </button>
        </div>
      </div>

      { isFilterBoxOpen &&
        <div className="mt-4 p-4 rounded-lg shadow-xl border border-gray-500/50">
          <div className="flex items-start justify-end gap-4">
            <div className="px-4 border-r border-gray-500">
              <p className="text-sm mb-2">運動の強度</p>
              <RadioBtnXs
                name={'strength'}
                options={strengthOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions} />
            </div>

            <div className="px-4 border-r border-gray-500">
              <p className="text-sm mb-2">場所</p>
              <RadioBtnXs
                name={'place'}
                options={placeOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}/>
            </div>

            <div className="px-4 border-r border-gray-500">
              <p className="text-sm mb-2">人数</p>
              <RadioBtnXs
                name={'num'}
                options={numOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}/>
            </div>

            <div className="px-4 border-r border-gray-500">
              <p className="text-sm mb-2">運動の種類</p>
              <RadioBtnXs
                name={'type'}
                options={typeOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}/>
            </div>

            <div className="flex flex-col gap-4">
              <button className="btn btn-xs btn-circle btn-ghost ml-auto" onClick={() => setIsFilterBoxOpen(false)}>
                <i className="i-uiw-close text-red-500 font-bold"/>
              </button>

              <button className="btn btn-xs btn-outline" onClick={(e) => {
                btnOff(e.target);
                settingSearchQuery();
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
      }
    </>
  )
}

export default SearchForm;
