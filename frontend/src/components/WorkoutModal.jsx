/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

function WorkoutModal(props) {
  const {workout, unburnedCalorie, setUnburnedCalorie} = props;

  const [requiredSeconds, setRequiredSeconds] = useState(workout.required_exercise_time * 60);
  const [remainingTime  , setRemainingTime  ] = useState(secondsToMMSS());
  
  // カウントダウン処理(setInterval)の管理
  const countdownId = useRef(false);

  // 1秒間に消費できるカロリー
  const burned_calo_per_second = (workout.burned_kcal / 3600);

  // 検索ボタンが押される=workoutが更新された時、フォームに入力されたカロリーを取得
  useEffect(() => {
    setRequiredSeconds(workout.required_exercise_time * 60);
  }, [workout]);

  // ボタンを押すと発火。
  // requiredSecondsの値を0になるまで1ずつへらす
  //[条件分岐]countdownId.current(現在実行中のカウントダウン)の有無
  function countdown() {
    if (countdownId.current) {
      clearInterval(countdownId.current);
      countdownId.current = false;
    } else {
      countdownId.current = setInterval(() => {
        setRequiredSeconds((prevSeconds) => prevSeconds - 1);
        setUnburnedCalorie((prevCalorie) => prevCalorie - burned_calo_per_second);
      }, 1000)
    }
  }

  // カウントダウンが0秒で終わるようにsetIntervalを管理
  useEffect(() => {
    if (requiredSeconds === 0) {
      clearInterval(countdownId.current);
    }
  }, [requiredSeconds])

  useEffect(() => {
    setRemainingTime(secondsToMMSS());
  }, [requiredSeconds])

  // z秒 -> x分y秒の形式に変換
  function secondsToMMSS() {
    const minutes = Math.floor(requiredSeconds / 60);
    return minutes === 0 ? `${makeTwoDigits(requiredSeconds)}秒` : `${makeTwoDigits(minutes)}分 ${makeTwoDigits(requiredSeconds - minutes * 60)}秒`
  }

  // １桁を2桁にする
  function makeTwoDigits(num) {
    return Math.floor(num / 10) === 0 ? `0${num}` : `${num}`
  }

  return (
    <>
      <button className="btn btn-primary" onClick={()=>document.querySelector(`#workout-modal-${workout.id}`).showModal()}>Let's Workout!!</button>
      
      {/* モーダルの内容 */}
      <dialog id={`workout-modal-${workout.id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg">{workout.name}</h3>

          <p className="py-4 text-center text-5xl">
            {remainingTime}
          </p>

          <p className="text-center mb-3">
            残り:
            <span className="text-red-500 font-medium text-3xl">{` ${Math.ceil(unburnedCalorie)} `}</span>
            kcal
          </p>
          
          <div className="flex justify-center">
            <button
              className="btn btn-lg rounded-full bg-emerald-100"
              onClick={countdown}
            >スタート/ストップ</button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  )
}

export default WorkoutModal;
