// [機能]
// - 現在の消費したカロリーを表示
// - 未消費のカロリーを表示(摂取カロリーが必要)
// - 運動に取り組んだ秒数を「MM分SS秒」形式で表示

import { useContext, useRef, useState } from "react";
import { secondsToMMSS } from "../../utils/integerStyle";
import { postWorkoutRecord } from "../../utils/workoutRecordRequest";
import AuthContext from "../../Contexts/AuthContext";

function WorkoutCount(props) {
  // eslint-disable-next-line react/prop-types
  const {intakedCalorie, burn_cal_per_second, required_exercise_time} = props;
  const {setYearlyData, setMonthlyData, setWeeklyData, setTodayData} = useContext(AuthContext);

  const [unburnedCalorie, setUnburnedCalorie] = useState(intakedCalorie);
  const [burnedCalorie  , setBurnedCalorie  ] = useState(0);
  const [workoutSeconds , setWorkoutSeconds ] = useState(0);
  const [btnText        , setBtnText        ] = useState("スタート");
  const [saveDisabled   , setSaveDisabled   ] = useState(true);

  // カウント処理(setInterval)のIDを管理(countId={current: 値})
  const countId = useRef(false);

  // 運動時間のカウントを開始/停止する
  function countBtn() {
    if(countId.current) {
      //停止
      clearInterval(countId.current);
      countId.current = false;
      setBtnText("スタート");
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
      //開始
      countId.current = setInterval(() => {
        setWorkoutSeconds(prevSeconds  => prevSeconds + 1);
        setBurnedCalorie(prevCalorie   => prevCalorie + burn_cal_per_second);
        setUnburnedCalorie(prevCalorie => prevCalorie - burn_cal_per_second);
      }, 1000);
      setBtnText("ストップ");
    }
  }

  //記録を保存処理
  const createWorkoutRecord = async() => {
    // カウント中は保存できない
    if (countId.current) {
      console.log('ストップしてから保存してください');
      return;
    }

    try {
      setSaveDisabled(true);
      // 記録をサーバに送信
      const params = {
        workoutTime: workoutSeconds,
        burnedCalories:   Math.ceil(burnedCalorie),
        unburnedCalories: Math.ceil(unburnedCalorie),
      };
      const res = await postWorkoutRecord(params);
      setYearlyData(res.data.yearlyData);
      setMonthlyData(res.data.monthlyData);
      setWeeklyData(res.data.weeklyData);
      setTodayData(res.data.todayData);
      // 消費/未消費カロリーと運動時間を0にする
      setWorkoutSeconds(0);
      setBurnedCalorie(0);
      setUnburnedCalorie(0);
      setSaveDisabled(false);
    } catch(error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="mb-8 p-5 border border-primary rounded-xl">
        <div className="mb-5 text-lg flex justify-center gap-8 items-end">
          <h3 className="">
            残り:
            <span className="text-error text-4xl font-semibold">{` ${Math.ceil(unburnedCalorie)} `}</span>
            kcal
          </h3>

          <h3 className="">
            消費カロリー:
            <span className="text-info text-4xl font-semibold">{` ${Math.floor(burnedCalorie)} `}</span>
            kcal
          </h3>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-gray-500 text-lg">目標: {required_exercise_time}分</p>
          <h3 className="text-5xl mb-2">{secondsToMMSS(workoutSeconds)}</h3>
        </div>

        <div className="mb-5">
          <button
            className="btn btn-lg rounded-full shadow-xl btn-primary"
            onClick={countBtn}
          >{btnText}</button>
        </div>

        <div className=" text-center mb-5">
          <button className="btn btn-success rounded-full mb-2" onClick={createWorkoutRecord} disabled={saveDisabled}>
            運動記録を保存
          </button>
          
          <div className="text-gray-500">
            <p className="text-sm">以下のデータを保存します</p>
            <ul className="text-xs">
              <li>・消費カロリー</li>
              <li>・未消費カロリー</li>
              <li>・運動時間</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkoutCount;