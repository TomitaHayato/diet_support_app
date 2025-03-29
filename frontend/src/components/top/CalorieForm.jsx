import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIntakedCalorie, setCalorie } from "../../Redux/Slice/intakedCalorieSlice";
import { selectWeight, setWeight } from "../../Redux/Slice/weightSlice";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import { grayText } from "../../utils/style";
import { selectTheme } from "../../Redux/Slice/ThemeSlice";

function CalorieForm() {
  const theme          = useSelector(selectTheme);
  const weight         = useSelector(selectWeight);
  const intakedCalorie = useSelector(selectIntakedCalorie);
  const currentUser    = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  // Formの入力値管理
  const [inputCalorie, setInputCalorie] = useState(intakedCalorie);
  const [inputWeight , setInputWeight ] = useState(weight);
  const [inputError  , setInputError  ] = useState(null);

  // ログインやプロフィール編集時など、weightの値が変更された時にフォームの値も変更
  useEffect(() => {
    if (currentUser) setInputWeight(currentUser.weight);
  }, [currentUser])

  function hundleClickReference() {
    window.open('https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/undou/index.html');
  }

  function hundleClickSearch() {
    if(!inputWeight || inputWeight <= 0) {
      setInputError('体重は "0以上の整数" を入力してください')
      return;
    }

    dispatch(setCalorie(inputCalorie));
    dispatch(setWeight(inputWeight));
  }

  return (
    <>
      <div className="text-xs md:text-base">
        <p className="text-center my-3 text-[0.7rem] md:text-sm">
          「消費したいカロリー」と「あなたの体重」を入力して下さい。
          <br />
          必要な運動時間を計算し、表示します。
        </p>

        {/* エラーメッセージ */}
        <p className="text-center text-[0.7rem] md:text-sm text-error">{inputError}</p>

        <div className='flex flex-row gap-2 md:gap-4 justify-center'>
          <div className='tooltip' data-tip="消費したいカロリー（整数）">
            <label className="input input-primary input-bordered flex items-center gap-2 lg:text-base input-sm lg:input-md max-w-28 md:max-w-full min-h-10">
              <span className='text-gray-400'>kcal</span>
              <input type="number" className="grow max-w-full" min={0} value={inputCalorie} onChange={(e) => setInputCalorie(e.target.value)} />
            </label>
          </div>

          <div className='tooltip' data-tip="体重（整数）">
            <label className="input input-primary input-bordered flex items-center gap-2 lg:text-base input-sm lg:input-md max-w-24 md:max-w-full min-h-10">
              <span className='text-gray-400'>kg</span>
              <input type="number" className="grow max-w-full" min={0} value={inputWeight} onChange={(e) => {
                setInputWeight(e.target.value);
                setInputError(null);
              }} />
            </label>
          </div>

          <button className='btn btn-primary btn-sm md:btn-md md:mx-2 min-h-10' onClick={hundleClickSearch}>調べる</button>
        </div>

        <p className={`text-center my-3 text-[0.6rem] md:text-sm w-10/12 mx-auto ${grayText(theme)}`}>
          消費カロリーの計算は以下を参考に計算しております。
          <br />
          厚生労働省
          <button className="link link-info" onClick={hundleClickReference}>「健康づくりのための身体活動・運動ガイド2023」</button>
        </p>
      </div>
    </>
  )
}

export default CalorieForm;
