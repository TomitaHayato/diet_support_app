// [このページの機能]
// 運動のカウントダウン
// 消費カロリー
// 未消費カロリー
// Topページに戻る（stateで{未消費カロリー(min 0)}と{体重}を渡す）

import { useLocation, useNavigate } from "react-router-dom";
import WorkoutCount from "../components/workout/WorkoutCount";
import SideMenu from "../components/general/SideMenu";
import { useState } from "react";

function Workout() {
  const location = useLocation();
  const {workout, intakedCalorie, weight, userInfoObj}  = location.state;

  const [userInfo, setUserInfo] = useState(userInfoObj);

  //1秒あたりに消費するカロリー
  const burn_cal_per_second = workout.burned_kcal / 3600;

  //ページ遷移
  const naviToTop = useNavigate();
  //トップページに遷移 state: {体重, 未消費カロリー}
  function transTop() {
    naviToTop("/", {state: { weight: weight, intakedCalorie: intakedCalorie}})
  }
  //トップページに遷移
  function transTopReset() {
    naviToTop("/", {state: { weight: weight}})
  }

  return (
    <>
      <div className="p-16 flex min-h-screen">
        <div className="basis-9/12">
          <div className="flex gap-4 mb-5">
            <button onClick={transTop}      className="btn bg-cyan-200">運動一覧へ</button>
            <button onClick={transTopReset} className="btn bg-emerald-200">カロリーを入力し直す</button>
          </div>

          <div className="text-center">
            <div className="mb-5">
              <h1 className="text-4xl font-bold">{workout.name}</h1>
            </div>
            
            {/* --- 運動時間を表示 --- */}
            <WorkoutCount
              intakedCalorie={intakedCalorie}
              burn_cal_per_second={burn_cal_per_second}
              required_exercise_time={workout.required_exercise_time}
            />
          </div>
        </div>

        <div className="divider divider-horizontal"></div>

        {/* メニュー */}
        <div className="basis-3/12">
          <SideMenu
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
      </div>
    </>
  )
}

export default Workout
