// [このページの機能]
// 運動のカウントダウン
// 消費カロリー
// 未消費カロリー
// Topページに戻る（stateで{未消費カロリー(min 0)}と{体重}を渡す）

import { useLocation } from "react-router-dom";
import WorkoutCount from "../components/workout/WorkoutCount";
import WorkoutForm from "../components/workout/WorkoutForm";
import TopPageLink from "../components/general/TopPageLink";

function Workout() {
  const location = useLocation();
  const {workout}  = location.state;

  return (
    <>
      <div className="flex justify-center gap-4 mb-5">
        <TopPageLink />
      </div>

      <div className="text-center">
        <div className="mb-5">
          <h1 className="text-2xl lg:text-4xl font-bold">{workout.name}</h1>
        </div>

        {/* --- 運動時間を表示 --- */}
        <WorkoutCount
          workout={workout} />
      </div>

      <div className="text-center">
        <WorkoutForm
          workout={workout} />
      </div>
    </>
  )
}

export default Workout
