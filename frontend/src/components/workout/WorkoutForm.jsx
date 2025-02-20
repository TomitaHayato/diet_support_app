import { useContext, useState } from "react";
import { postWorkoutRecord } from "../../utils/workoutRecordRequest";
import { AuthContext } from "../../Contexts/Contexts";
import Big from 'big.js';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Slice/currentUserSlice";
import { putDev } from "../../utils/devTool";

function WorkoutForm(props) {
  const {workout} = props;
  const intakedCalorie = useSelector(state => state.intakedCalorie.value);
  const {setYearlyData, setMonthlyData, setWeeklyData, setTodayData} = useContext(AuthContext);
  const currentUser = useSelector(selectCurrentUser);

  const [workoutTime     , setWorkoutTime     ] = useState(0);
  const [burnedCalories  , setBurnedCalories  ] = useState(0);
  const [unburnedCalories, setUnburnedCalories] = useState(0);
  const [saveDisabled    , setSaveDisabled    ] = useState(false);

  function changeRecords(minutes, intakedCalorie) {
    if(minutes < 0) return;

    // const burnedCaloX100000 = minutes * Math.floor(workout.burnedKcalPerMin * 100000) //誤差をなくすために整数化する
    const burnedKcal = new Big(workout.burnedKcalPerMin).times(minutes).round().toNumber();
    setWorkoutTime(minutes);
    setBurnedCalories(burnedKcal);
    setUnburnedCalories(intakedCalorie - burnedKcal);
  }

  const createWorkoutRecord = async() => {
    if(workoutTime === 0) return;

    setSaveDisabled(true);
    try {
      const params = {
        workoutTime:      workoutTime * 60,
        intakedCalories:  intakedCalorie,
        burnedCalories:   burnedCalories,
        unburnedCalories: unburnedCalories,
      }
      const res = await postWorkoutRecord(params)
      setYearlyData(res.data.yearlyData);
      setMonthlyData(res.data.monthlyData);
      setWeeklyData(res.data.weeklyData);
      setTodayData(res.data.todayData);
      // フォームのリセット
      setWorkoutTime(0);
      setBurnedCalories(0);
      setUnburnedCalories(0);
    } catch(error) {
      putDev(error);
    }
    setSaveDisabled(false);
  }

  return (
    <>
      <div className="border border-primary rounded-xl p-5">
        <p className="mb-5 text-info text-xl">運動時間を直接入力する</p>

        <div className="mb-5">
          <p>摂取カロリー：
            <span className="text-lg font-semibold">{` ${intakedCalorie} `}</span>
            kcal
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mb-3">
          <input type="number" className="input input-bordered" value={workoutTime} onChange={(e) => changeRecords(e.target.value, intakedCalorie)}/>
          <span>分</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3 text-gray-500">
          <span className="">消費カロリー</span>
          {/* 入力された運動時間から、消費カロリーを求めて表示 */}
          <span className="text-lg text-info">{burnedCalories}</span>
          <span>kcal</span>
        </div>

        <div className="mb-3 flex justify-center items-center gap-3 text-gray-500">
          <span className="">残りカロリー</span>
          {/* 摂取カロリーから消費カロリーを引いた値を動的に表示 */}
          <span className="text-lg text-error">{unburnedCalories}</span>
          <span>kcal</span>
        </div>

        <div className="mb-5">
          {/* 運動時間&消費カロリーを保存 => フォームの値を0にする */}
          <button
            className="btn btn-wide btn-success rounded-xl"
            disabled={currentUser ? saveDisabled : true}
            onClick={createWorkoutRecord}
          >保存</button>
          {currentUser ? null : 
            <p className="text-red-500 text-sm">＊ログイン後に保存できます</p>
          }
        </div>

        <div className="text-gray-500 w-3/12 mx-auto">
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
