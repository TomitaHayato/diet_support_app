import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalorie } from "../../Redux/Slice/intakedCalorieSlice";
import { selectWeight, setWeight } from "../../Redux/Slice/weightSlice";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";

function CalorieForm() {
  const weight = useSelector(selectWeight);
  const intakedCalorie = useSelector(state => state.intakedCalorie.value)
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  // Formの入力値管理
  const [inputCalorie, setInputCalorie] = useState(intakedCalorie);
  const [inputWeight , setInputWeight ] = useState(weight);

  // ログインやプロフィール編集時など、weightの値が変更された時にフォームの値も変更
  useEffect(() => {
    if (currentUser) setInputWeight(currentUser.weight);
  }, [currentUser])

  return (
    <>
      <div className="text-xs md:text-base">
        <p className="text-center my-3 text-[0.7rem] md:text-base">「消費したいカロリー」と「あなたの体重」を入力してください</p>
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
              <input type="number" className="grow max-w-full" min={0} value={inputWeight} onChange={(e) => setInputWeight(e.target.value)} />
            </label>
          </div>

          <button className='btn btn-primary btn-sm md:btn-md md:mx-2 min-h-10' onClick={() => {
            dispatch(setCalorie(inputCalorie));
            dispatch(setWeight(inputWeight));
          }}>調べる</button>
        </div>
      </div>
    </>
  )
}

export default CalorieForm;
