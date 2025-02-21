// [このページの機能]
// 運動のカウントダウン
// 消費カロリー
// 未消費カロリー
// Topページに戻る（stateで{未消費カロリー(min 0)}と{体重}を渡す）

import { useLocation, useNavigate } from "react-router-dom";
import WorkoutCount from "../components/workout/WorkoutCount";
import WorkoutForm from "../components/workout/WorkoutForm";

function Workout() {
  const location = useLocation();
  const {workout}  = location.state;

  const naviToTop = useNavigate();

  //トップページに遷移
  function transTop() {
    naviToTop("/");
  }

  return (
    <>
      <div className="">
        <div className="">
          <div className="flex justify-center gap-4 mb-5">
            <button onClick={transTop}      className="btn btn-wide btn-outline">運動一覧へ</button>
          </div>

          <div className="text-center">
            <div className="mb-5">
              <h1 className="text-4xl font-bold">{workout.name}</h1>
            </div>
            
            {/* --- 運動時間を表示 --- */}
            <WorkoutCount
              workout={workout} />
          </div>

          <div className="text-center">
            <WorkoutForm
              workout={workout} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Workout
