import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import { useCallback, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { getUser } from "../utils/auth";
import { isEmptyObj } from "../utils/objectControl";
import { getWorkoutRecords } from "../utils/workoutRecordRequest";

function App() {
  const [authInfo, setAuthInfo] = useState({});
  const [weight  , setWeight  ] = useState(50);
  const [theme   , setTheme   ] = useState("retro");

  const [yearlyData , setYearlyData ] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData , setWeeklyData ] = useState([]);
  const [todayData  , setTodayData  ] = useState([]);

  let currentUser = authInfo?.isLogin ? authInfo.data : false;

  // ユーザーログイン時に、運動データを取得
  useEffect(() => {
    if(authInfo?.isLogin) {
      requestWorkoutRecords(); // "/workout_records" にGETリクエストを送信
    }
  }, [authInfo])

  const requestWorkoutRecords = async() => {
    try {
      const res = await getWorkoutRecords();
      setYearlyData(res.data.yearlyData);
      setMonthlyData(res.data.monthlyData);
      setWeeklyData(res.data.weeklyData);
      setTodayData(res.data.todayData);
      // console.log(res.data)
    } catch(error) {
      console.log(error);
    }
  }

  // ユーザーログイン時に、体重をユーザーの体重に変更
  useEffect(() => {
    const userWeight = authInfo.data?.weight
    if(userWeight) {
      setWeight(userWeight);
    }
  }, [authInfo])

  // ユーザーの認証情報を取得
  const firstSetUserInfo = useCallback(
    async () => {
      const res = await getUser();
      setAuthInfo(res.data);
    }, [setAuthInfo]
  )

  useEffect(() => {
    if(isEmptyObj(authInfo)) {
      firstSetUserInfo();
    }
  }, [authInfo, firstSetUserInfo])

  return (
    <>
      <div data-theme={theme}>
        <AuthContext.Provider value={{authInfo, setAuthInfo, currentUser, weight, setWeight, theme, setTheme, yearlyData, monthlyData, weeklyData, todayData}}>
          <BrowserRouter>
            <Routes>
              <Route path="/"            element={<Top />} />
              <Route path="/workout/:id" element={<Workout />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App;
