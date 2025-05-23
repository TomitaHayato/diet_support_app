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
import { selectIntakedCalorie } from "../../Redux/Slice/intakedCalorieSlice";
import { selectCsrfToken } from "../../Redux/Slice/csrfTokenSlice";
import { selectTheme } from "../../Redux/Slice/ThemeSlice";
import { grayText } from "../../utils/style";
import { useStopwatch } from 'react-timer-hook';

function WorkoutCount(props) {
  const {workout} = props;
  const dispatch = useDispatch();

  const intakedCalorie = useSelector(selectIntakedCalorie);
  const currentUser    = useSelector(selectCurrentUser);
  const csrfToken      = useSelector(selectCsrfToken);
  const theme          = useSelector(selectTheme);  

  const [unburnedCalorie, setUnburnedCalorie] = useState(intakedCalorie);
  const [burnedCalorie  , setBurnedCalorie  ] = useState(0);
  const [saveDisabled   , setSaveDisabled   ] = useState(true);
  const [savedMessage   , setSavedMessage   ] = useState(null);

  const {
    totalSeconds,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({autoStart: false});

  useEffect(() => {
    if(totalSeconds === 0) return;
    const burnedCalorieVal = new Big(workout.burnedKcalPerSec).times(totalSeconds);
    setBurnedCalorie(burnedCalorieVal.toNumber());
    setUnburnedCalorie(new Big(intakedCalorie).minus(burnedCalorieVal).toNumber());
    setSavedMessage(null);
  }, [totalSeconds, workout.burnedKcalPerSec, intakedCalorie])

  //記録を保存処理
  const createWorkoutRecord = async() => {
    const params = {
      workoutTime:      totalSeconds,
      burnedCalories:   Math.floor(burnedCalorie),
      intakedCalories:  intakedCalorie,
      workout_id:       workout.id
    };

    // 記録をサーバに送信
    dispatch(createWorkoutRecordThunk({params, csrfToken}));
    // 消費/未消費カロリーと運動時間を0にする, タイマーリセット, 保存ボタンをdisabledにする
    reset(null, false);
    setSaveDisabled(true);
    setBurnedCalorie(0);
    setUnburnedCalorie(0);
    setSavedMessage('運動記録を保存しました');
  };

  function hundleClickTimerStart() {
    if(isRunning) {
      pause();
    } else {
      start();
    }
    setSaveDisabled(!isRunning); //カウントダウン中はdisabledをtrue
  }

  return (
    <>
      <div className="mb-8 p-5 border border-primary rounded-xl">
        <div className="mb-5 lg:text-lg flex justify-center gap-4 lg:gap-8 items-end">
          <h3 className="">
            残り:<br className="lg:hidden"/>
            <span className="text-error text-2xl lg:text-4xl font-semibold" role="kcal" aria-label="unburned">{` ${Math.ceil(unburnedCalorie)} `}</span>
            kcal
          </h3>

          <h3 className="">
            消費カロリー:<br className="lg:hidden"/>
            <span className="text-info text-2xl lg:text-4xl font-semibold" role="kcal" aria-label="burned">{` ${Math.floor(burnedCalorie)} `}</span>
            kcal
          </h3>
        </div>

        <div className="mb-8">
          <p className={`mb-2 text-lg ${grayText(theme)}`} role="time" aria-label="target">目標: {workout.requiredExerciseTime}分</p>
          <h3 className="text-4xl sm:text-5xl mb-2" role="time" aria-label="count">
            {secondsToMMSS(totalSeconds)}
          </h3>
        </div>

        <div className="mb-5">
          <button
            className="btn btn-wide btn-md md:btn-lg rounded-full shadow-xl btn-primary"
            aria-label="start-stop"
            onClick={hundleClickTimerStart}
          >{isRunning ? 'ストップ' : 'スタート'}</button>
        </div>

        <div className=" text-center mb-5">
          {currentUser && <p className="text-emerald-500">{savedMessage}</p>}

          <button className="btn btn-sm md:btn-md md:btn-wide h-10 md:h-auto btn-success rounded-full" disabled={currentUser ? saveDisabled : true}
            aria-label="record-submit"
            onClick={createWorkoutRecord}
          >運動記録を保存</button>
          {currentUser ? null : 
            <p className="text-red-500 text-sm">＊ログイン後に保存できます</p>
          }
          
          <div className={`w-8/12 md:w-3/12 mx-auto mt-5 ${grayText(theme)}`}>
            <p className="text-sm">以下のデータを保存します</p>
            <ul className="text-sm text-start">
              <li>・運動時間</li>
              <li>・消費カロリー</li>
              <li>・摂取カロリー</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkoutCount;