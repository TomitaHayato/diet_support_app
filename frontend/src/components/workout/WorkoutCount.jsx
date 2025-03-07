// [機能]
// - 現在の消費したカロリーを表示
// - 未消費のカロリーを表示(摂取カロリーが必要)
// - 運動に取り組んだ秒数を「MM分SS秒」形式で表示

import { useEffect, useState } from "react";
import { secondsToMMSS } from "../../utils/integerStyle";
import Big from 'big.js';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import { createWorkoutRecordThunk } from "../../Redux/Slice/workoutRecordsSlice";

function WorkoutCount(props) {
  const {workout} = props;
  const dispatch = useDispatch();

  const intakedCalorie = useSelector(state => state.intakedCalorie.value);
  const currentUser = useSelector(selectCurrentUser);

  const [unburnedCalorie, setUnburnedCalorie] = useState(intakedCalorie);
  const [burnedCalorie  , setBurnedCalorie  ] = useState(0);
  const [workoutSeconds , setWorkoutSeconds ] = useState(0);
  const [saveDisabled   , setSaveDisabled   ] = useState(true);
  const [isCountDown    , setIsCountDown    ] = useState(false);

  // スタートボタン => isCountDownをtrueに
  useEffect(() => {
    let intervalId
    if(isCountDown) {
      intervalId = setInterval(() => {
        setWorkoutSeconds(prevSeconds  => prevSeconds + 1);
        setBurnedCalorie(prevCalorie => new Big(workout.burnedKcalPerSec).plus(prevCalorie).toNumber())
        setUnburnedCalorie(prevCalorie => prevCalorie - new Big(workout.burnedKcalPerSec))
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isCountDown, workout.burnedKcalPerSec])

  //記録を保存処理
  const createWorkoutRecord = async(workoutSeconds, burnedCalorie, unburnedCalorie) => {    
    const params = {
      workoutTime:      workoutSeconds,
      burnedCalories:   Math.floor(burnedCalorie),
      unburnedCalories: Math.ceil(unburnedCalorie),
      intakedCalories:  Math.floor(burnedCalorie) + Math.ceil(unburnedCalorie),
    };

    // 記録をサーバに送信
    dispatch(createWorkoutRecordThunk(params))
    // 消費/未消費カロリーと運動時間を0にする
    setWorkoutSeconds(0);
    setBurnedCalorie(0);
    setUnburnedCalorie(0);
  };

  return (
    <>
      <div className="mb-8 p-5 border border-primary rounded-xl">
        <div className="mb-5 text-lg flex justify-center gap-8 items-end">
          <h3 className="">
            残り:
            <span className="text-error text-4xl font-semibold" role="kcal" aria-label="unburned">{` ${Math.ceil(unburnedCalorie)} `}</span>
            kcal
          </h3>

          <h3 className="">
            消費カロリー:
            <span className="text-info text-4xl font-semibold" role="kcal" aria-label="burned">{` ${Math.floor(burnedCalorie)} `}</span>
            kcal
          </h3>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-gray-500 text-lg" role="time" aria-label="target">目標: {workout.requiredExerciseTime}分</p>
          <h3 className="text-5xl mb-2" role="time" aria-label="count">{secondsToMMSS(workoutSeconds)}</h3>
        </div>

        <div className="mb-5">
          <button
            className="btn btn-wide btn-lg rounded-full shadow-xl btn-primary"
            aria-label="start-stop"
            onClick={() => {
              setIsCountDown(prev => !prev);
              setSaveDisabled(!isCountDown); //カウントダウン中はdisabledをtrue
          }}>{isCountDown ? 'ストップ' : 'スタート'}</button>
        </div>

        <div className=" text-center mb-5">
          <button className="btn btn-wide btn-success rounded-full" disabled={currentUser ? saveDisabled : true}
            aria-label="record-submit"
            onClick={() => {
              createWorkoutRecord(workoutSeconds, burnedCalorie, unburnedCalorie);
            }
          }>運動記録を保存</button>
          {currentUser ? null : 
            <p className="text-red-500 text-sm">＊ログイン後に保存できます</p>
          }
          
          <div className="text-gray-500 w-3/12 mx-auto mt-5">
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
      </div>
    </>
  )
}

export default WorkoutCount;