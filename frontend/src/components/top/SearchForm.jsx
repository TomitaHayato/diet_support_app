import { useEffect, useState } from "react";
import { btnOff, btnOn } from "../../utils/formCtl";
import RadioBtnXs from "./RadioBtnXs";
import { defaultSelectedOptions } from "../../utils/workoutTags";
import { removeUnspecified, searchAndFilter } from "../../utils/search";
import AutoComplete from "./AutoComplete";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import { useToast } from "../../customHooks/useToast";

function SearchForm(props) {
  const {workoutsObj, autoCompleteList ,setAutoCompleteList, setSearchWords, setFilterQuery, isOnlyLiked, setIsOnlyLiked} = props;

  const [inputWords     , setInputWords     ] = useState(''); // 検索Formの入力値 =>「検索」ボタンClickでsearchWordsにset
  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions());
  const currentUser = useSelector(selectCurrentUser);

  // 検索FormがActiveかどうか
  const [isFormActive, setIsFormActive] = useState(false);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const { triggerToast } = useToast();

  // 検索・絞り込みクエリを反映
  function settingSearchQuery() {
    setSearchWords(inputWords);
    setFilterQuery(
      removeUnspecified(selectedOptions)
    );
  }

  // お気に入り済みのみに絞り込み
  function filteringFavorite() {
    if (!currentUser) {
      triggerToast('needLogin');
      return;
    }
    setIsOnlyLiked(prev => !prev)
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
      <div className="flex justify-end gap-2 lg:gap-4 text-xs lg:text-base">
        {/* 検索フォーム */}
        <div className="flex flex-col">
          <div className="join">
            <label className="input input-sm input-bordered flex items-center gap-2 join-item">
              <input type="text" id="searchInput" className="grow w-8/12 text-xs lg:text-sm" placeholder="運動名で検索"
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

        {/* お気に入りのみ */}
        <div>
          <button
            className={`btn btn-sm text-xs lg:text-sm ${isOnlyLiked ? "text-white bg-blue-600 hover:bg-blue-600" : "btn-outline"}`}
            onClick={filteringFavorite}>
            <i className="i-uiw-heart-on text-pink-400"/>
            <span className="hidden lg:block">済み</span>
          </button>
        </div>

        {/* 絞り込み */}
        <div>
          <button className="btn btn-sm btn-outline" onClick={() => {
            setIsFilterBoxOpen(prev => !prev)
          }}>
            <span className="hidden lg:block">絞り込み</span>
            <i className="i-uiw-filter"/>
          </button>
        </div>
      </div>

      {/* 絞り込み設定  */}
      { isFilterBoxOpen &&
        <div className="mt-4 p-4 rounded-lg shadow-xl border border-gray-500/50">
          <div className="flex flex-col-reverse lg:flex-row items-start justify-end gap-1 lg:gap-4">
            <div className="grid grid-cols-2 gap-3 mt-3 lg:flex lg:gap-0">
              {
                ['num', 'place', 'strength', 'type'].map((tagName) => {
                  return(
                    <div key={tagName}>
                      <RadioBtnXs
                      name={tagName}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions} />
                    </div>
                  )
                })
              }
            </div>
            

            <div className="flex flex-row-reverse lg:flex-col gap-4 ml-auto lg:ml-0">
              <button className="btn btn-xs btn-circle btn-ghost ml-auto" onClick={() => setIsFilterBoxOpen(false)}>
                <i className="i-uiw-close text-red-500 font-bold"/>
              </button>

              <button className="btn btn-xs btn-warning" onClick={(e) => {
                btnOff(e.target);
                settingSearchQuery();
                btnOn(e.target);
              }}>検索</button>

              <button className="btn btn-xs btn-outline" onClick={e => {
                btnOff(e.target);
                setSelectedOptions(defaultSelectedOptions());
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
