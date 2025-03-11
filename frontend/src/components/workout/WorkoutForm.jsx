import { useState } from "react";
import Big from 'big.js';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import { createWorkoutRecordThunk } from "../../Redux/Slice/workoutRecordsSlice";

function WorkoutForm(props) {
  const {workout} = props;
  const dispatch = useDispatch();
  const intakedCalorie = useSelector(state => state.intakedCalorie.value);
  const currentUser = useSelector(selectCurrentUser);

  const [workoutTime     , setWorkoutTime     ] = useState(0);
  const [burnedCalories  , setBurnedCalories  ] = useState(0);
  const [unburnedCalories, setUnburnedCalories] = useState(0);
  const [saveDisabled    , setSaveDisabled    ] = useState(false);

  function changeRecords(minutes, intakedCalorie) {
    if(minutes < 0) return;

    const burnedKcal = minutes ? new Big(workout.burnedKcalPerMin).times(minutes).round().toNumber() : 0;
    setWorkoutTime(minutes);
    setBurnedCalories(burnedKcal);
    setUnburnedCalories(intakedCalorie - burnedKcal);
  }

  const createWorkoutRecord = async(workoutTime, intakedCalorie, burnedCalories, unburnedCalories, workout) => {
    if(!workoutTime || workoutTime === 0) return;

    setSaveDisabled(true);
    const params = {
      workoutTime:      workoutTime * 60,
      intakedCalories:  intakedCalorie,
      burnedCalories:   burnedCalories,
      unburnedCalories: unburnedCalories,
      workout_id:       workout.id
    }

    dispatch(createWorkoutRecordThunk(params));
    // フォームのリセット
    setWorkoutTime(0);
    setBurnedCalories(0);
    setUnburnedCalories(0);

    setSaveDisabled(false);
  }

  return (
    <>
      <div className="border border-primary rounded-xl p-5">
        <p className="mb-5 text-info font-semibold text-lg">運動時間を直接入力する</p>

        <div className="mb-5">
          <p>摂取カロリー：
            <span className="text-lg font-semibold" role="kcal" aria-label="intaked">{` ${intakedCalorie} `}</span>
            kcal
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-3">
          <input type="number" className="input input-bordered input-sm md:input-md max-w-28 md:max-w-full"
            value={workoutTime} aria-label="workout-minute"
            onChange={(e) => changeRecords(e.target.value, intakedCalorie)} />
          <span>分</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3 text-gray-500">
          <span className="">消費カロリー</span>
          {/* 入力された運動時間から、消費カロリーを求めて表示 */}
          <span className="text-lg text-info" role="kcal" aria-label="burned">{burnedCalories}</span>
          <span>kcal</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3 text-gray-500">
          <span className="">残りカロリー</span>
          {/* 摂取カロリーから消費カロリーを引いた値を動的に表示 */}
          <span className="text-lg text-error" role="kcal" aria-label="unburned">{unburnedCalories}</span>
          <span>kcal</span>
        </div>

        <div className="mb-5">
          {/* 運動時間&消費カロリーを保存 => フォームの値を0にする */}
          <button
            className="btn btn-wide btn-success rounded-xl btn-sm md:btn-md max-w-40 md:max-w-full"
            disabled={currentUser ? saveDisabled : true}
            aria-label="workout-form-submit"
            onClick={() => createWorkoutRecord(workoutTime, intakedCalorie, burnedCalories, unburnedCalories, workout)}
          >保存</button>
          {currentUser ? null : 
            <p className="text-red-500 text-sm">＊ログイン後に保存できます</p>
          }
        </div>

        <div className="text-gray-500 w-8/12 md:w-3/12 mx-auto">
            <p className="text-sm">以下のデータを保存します</p>
            <ul className="text-sm text-start">
              <li>・運動時間</li>
              <li>・消費カロリー</li>
              <li>・未消費カロリー</li>
              <li>・摂取カロリー</li>
              <li className="text-xs">(消費カロリー＋未消費カロリー)</li>
            </ul>
          </div>
      </div>
    </>
  )
}

export default WorkoutForm;
