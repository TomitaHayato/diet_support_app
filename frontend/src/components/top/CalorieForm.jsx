import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/Contexts";
import { btnOff, btnOn } from "../../utils/formCtl";

function CalorieForm(props) {
  const {intakedCalorie, setIntakedCalorie} = props;
  const {weight, setWeight} = useContext(AuthContext);

  // Formの入力値管理
  const [inputCalorie, setInputCalorie] = useState(intakedCalorie);
  const [inputWeight , setInputWeight ] = useState(weight);

  // ログインやプロフィール編集時など、weightの値が変更された時にフォームの値も変更
  useEffect(() => {
    setInputWeight(weight);
  }, [weight])

  return (
    <>
      <div className="">
        <p className="text-center my-3">「消費したいカロリー」と「あなたの体重」を入力してください</p>
        <div className='flex gap-4 justify-center'>
          <div className='tooltip' data-tip="摂取カロリー（整数）">
            <label className="input input-primary input-bordered flex items-center gap-2">
              <span className='text-gray-400'>kcal</span>
              <input type="number" className="grow" min={0} value={inputCalorie} onChange={(e) => setInputCalorie(e.target.value)} />
            </label>
          </div>

          <div className='tooltip' data-tip="体重（整数）">
            <label className="input input-primary input-bordered flex items-center gap-2">
              <span className='text-gray-400'>kg</span>
              <input type="number" className="grow" min={0} value={inputWeight} onChange={(e) => setInputWeight(e.target.value)} />
            </label>
          </div>

          <button className='btn btn-primary' onClick={(e) => {
            btnOff(e.target);
            setIntakedCalorie(inputCalorie);
            setWeight(inputWeight);
            btnOn(e.target);
          }}>調べる</button>
        </div>
      </div>
    </>
  )
}

export default CalorieForm;
