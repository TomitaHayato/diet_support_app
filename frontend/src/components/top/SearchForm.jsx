import { btnOff, btnOn, resetInput } from "../../utils/formCtl";
import { closeEl, openAndCloseEl } from "../../utils/openClose";
import RadioBtnXs from "../general/data-input/RadioBtnXs";

function SearchForm() {

  return (
    <>
      <div className="flex justify-end gap-3">
        {/* 検索フォーム */}
        <div className="join">
          <label className="input input-sm input-bordered flex items-center gap-2 join-item">
            <input type="text" id="searchInput" className="grow" placeholder="運動名で検索" />
            <button className="btn btn-xs btn-circle btn-ghost" onClick={() => resetInput(document.querySelector('#searchInput'))}>
              <i className="i-uiw-close"/>
            </button>
          </label>

          <button
            className="btn btn-sm join-item rounded-r-lg text-gray-800 bg-amber-300 hover:bg-amber-200"
            onClick={(e) => {
              btnOff(e.target);
              btnOn(e.target);
            }}
          >
            検索<i className="i-uiw-search"/>
          </button>
        </div>

        {/* 絞り込み */}
        <div>
          <button className="btn btn-sm btn-outline" onClick={() => openAndCloseEl(document.querySelector('#sortBox'))}>
            絞り込み<i className="i-uiw-filter"/>
          </button>
        </div>
      </div>

      <div id="sortBox" className="hidden w-full mt-4 p-4 rounded-lg shadow-xl border border-gray-500/50">
        <div className="flex items-start justify-end gap-4">

          <p>絞り込み条件:</p>

          {/* 難易度 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">難易度</p>
            {
              ['指定なし', 'イージー', 'ハード'].map((radioValue) => {
                const name='difficulty'
                return (
                  <div key={`${name}-${radioValue}`}>
                    <RadioBtnXs name={name} value={radioValue} />
                  </div>
                )
              })
            }
          </div>

          {/* 場所 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">場所</p>
            {
              ['指定なし', '家でできる', 'アウトドア'].map((radioValue) => {
                const name='place'
                return (
                  <div key={`${name}-${radioValue}`}>
                    <RadioBtnXs name={name} value={radioValue} />
                  </div>
                )
              })
            }
          </div>

          {/* 人数 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">人数</p>
            {
              ['指定なし', 'ひとりで', 'だれかと'].map((radioValue) => {
                const name='menber'
                return (
                  <div key={`${name}-${radioValue}`}>
                    <RadioBtnXs name={name} value={radioValue} />
                  </div>
                )
              })
            }
          </div>

          <div className="flex flex-col gap-4">
            <button className="btn btn-xs btn-circle btn-ghost ml-auto" onClick={() => closeEl(document.querySelector('#sortBox'))}>
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>
            <button className="btn btn-xs btn-outline">この条件で検索</button>
            <button className="btn btn-xs btn-outline">リセット</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchForm;
