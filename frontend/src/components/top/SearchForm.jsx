import { btnOff, btnOn, resetInput } from "../../utils/formCtl";
import { closeEl, openAndCloseEl } from "../../utils/openClose";

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

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="dificulty" className="radio radio-xs" />
                <span className="text-xs">指定なし</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="dificulty" className="radio radio-xs" />
                <span className="text-xs">イージー</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="dificulty" className="radio radio-xs" />
                <span className="text-xs">ハード</span>
              </label>
            </div>
          </div>

          {/* 場所 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">場所</p>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="place" className="radio radio-xs" />
                <span className="text-xs">指定なし</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="place" className="radio radio-xs" />
                <span className="text-xs">家でできる</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="place" className="radio radio-xs" />
                <span className="text-xs">アウトドア</span>
              </label>
            </div>
          </div>

          {/* 人数 */}
          <div className="px-4 border-r border-gray-500">
            <p className="text-sm mb-2">人数</p>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="num" className="radio radio-xs" />
                <span className="text-xs">指定なし</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="num" className="radio radio-xs" />
                <span className="text-xs">ひとりで</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer gap-2 justify-start">
                <input type="radio" name="num" className="radio radio-xs" />
                <span className="text-xs">だれかと</span>
              </label>
            </div>
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
