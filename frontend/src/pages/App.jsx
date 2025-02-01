import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import SideMenu from "../components/general/sidemenu/SideMenu"
import { useEffect, useState } from "react";
import { AuthContext, SideMenuContext } from "../Contexts/Contexts";
import { getUser, isAccessTokenInCookie } from "../utils/auth";
import { getWorkoutRecords } from "../utils/workoutRecordRequest";
import Header from "../components/general/header/Header";

function App() {
  const [weight     , setWeight     ] = useState(50);
  const [theme      , setTheme      ] = useState("dark");
  const [currentUser, setCurrentUser] = useState(false);
  const [yearlyData , setYearlyData ] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData , setWeeklyData ] = useState([]);
  const [todayData  , setTodayData  ] = useState([]);

  // 初期レンダリング時に、認証トークンを保持していればログインユーザデータ取得
  useEffect(() => {
    const getAuthInfo = async() => {
      const res = await getUser();
      setCurrentUser(res.data);
      // console.log(res.data)
    }

    if(isAccessTokenInCookie()) getAuthInfo();
  }, []);

  // ログイン/ログアウト時の処理
  useEffect(() => {
    if(currentUser) {
      requestWorkoutRecords();       // 運動データを取得
      setWeight(currentUser.weight); // weightにログインユーザの体重をセット
    }
  }, [currentUser])

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

  return (
    <>
      <div data-theme={theme}>
        <AuthContext.Provider value={{currentUser, setCurrentUser, weight, setWeight, setYearlyData, setMonthlyData, setWeeklyData, setTodayData}}>
          <BrowserRouter>
            <div className="flex px-8 h-screen mx-auto">
              <div className="basis-9/12 w-full overflow-y-scroll overscroll-none">
                <Header />

                <div className="py-8 pl-1 pr-5">
                  <Routes>
                    <Route path="/"            element={<Top />} />
                    <Route path="/workout/:id" element={<Workout />} />
                  </Routes>
                </div>
              </div>

              <div className="divider divider-horizontal mx-0"></div>

              {/* サイドメニュー */}
              <div className="py-12 px-1 basis-3/12 w-full overflow-y-scroll overscroll-none">
                <SideMenuContext.Provider value={{yearlyData, monthlyData, weeklyData, todayData, theme, setTheme}}>
                  <SideMenu />
                </SideMenuContext.Provider>
              </div>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App;
