// [このページの機能]
// 運動のカウントダウン
// 消費カロリー
// 未消費カロリー
// Topページに戻る（stateで{未消費カロリー(min 0)}と{体重}を渡す）

import { useLocation, useNavigate } from "react-router-dom";

function Workout() {
  const location = useLocation();
  const {workout, intakedCalorie, weight}  = location.state;

  const naviToTop = useNavigate();
  function transTop() {
    // トップページに遷移 state: {体重, 未消費カロリー}
    naviToTop("/", {state: { weight: weight, intakedCalorie: intakedCalorie}})
  }

  return (
    <>
      <div className="p-16">
        <h1>{workout.name}</h1>
        <p>{intakedCalorie} kcal</p>
        <p>{weight} kg</p>
        <p>{workout.required_exercise_time} 分</p>

        <div>
          <button onClick={transTop} className="btn">トップへ</button>
        </div>
      </div>
    </>
  )
}

export default Workout
