// [このページの機能]
// 運動のカウントダウン
// 消費カロリー
// 未消費カロリー
// Topページに戻る（stateで{未消費カロリー(min 0)}と{体重}を渡す）

import { useParams } from "react-router-dom";
import WorkoutCount from "../components/workout/WorkoutCount";
import WorkoutForm from "../components/workout/WorkoutForm";
import TopPageLink from "../components/general/TopPageLink";
import { useEffect, useState } from "react";
import { putDev } from "../utils/devTool";
import { workoutShowRequest } from "../utils/workoutRequest";
import { useSelector } from "react-redux";
import { selectWeight } from "../Redux/Slice/weightSlice";
import { selectIntakedCalorie } from "../Redux/Slice/intakedCalorieSlice";

function Workout() {
  const urlParams = useParams();
  const [workout, setWorkout] = useState();

  const weight         = useSelector(selectWeight);
  const intakedCalorie = useSelector(selectIntakedCalorie);

  // api workoutsコントローラのshowアクションにgetリクエストを送信
  const fetchWorkout = async(id, weight, intakedCalorie) => {
    const params = { weight, intakedCalorie }
    try {
      const res = await workoutShowRequest(id, params);
      putDev("workoutのshowのres");
      putDev(res);
      setWorkout(res.data.workout);
    } catch(e) {
      putDev(e);
    }
  }

  useEffect(() => {
    fetchWorkout(urlParams.id, weight, intakedCalorie);
  }, [urlParams, weight, intakedCalorie])

  if(!workout) return(<></>);

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
