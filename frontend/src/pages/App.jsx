import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import SideMenu from "../components/general/sidemenu/SideMenu"
import { useEffect } from "react";
import Header from "../components/general/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, selectCurrentUser } from "../Redux/Slice/currentUserSlice";
import { setWeight } from "../Redux/Slice/weightSlice";
import { isAccessTokenInCookie } from "../utils/auth";
import { getWorkoutRecordsThunk } from "../Redux/Slice/workoutRecordsSlice";
import Footer from "../components/general/footer/Footer";
import Records from "./mobile/Records";
import Profile from "./mobile/Profile";

function App() {
  const dispatch = useDispatch();

  const theme = useSelector(state => state.theme.name);
  const currentUser = useSelector(selectCurrentUser);

  // 認証トークンを保持していればログインユーザデータ取得
  useEffect(() => {
    if(currentUser || !isAccessTokenInCookie()) return;
    dispatch(fetchUserThunk());
  }, [currentUser, dispatch]);

  // ログイン・ユーザー更新時の処理
  useEffect(() => {
    if(currentUser) {
      // requestWorkoutRecords();                 // 運動データを取得
      dispatch(getWorkoutRecordsThunk());
      dispatch(setWeight(currentUser.weight)); // weightにログインユーザの体重をセット
    }
  }, [currentUser, dispatch])

  return (
    <>
      <div data-theme={theme} className="h-screen">
        <BrowserRouter>
          <div className="flex mx-auto h-full">
            <div className="lg:w-3/4">
              <div className="overflow-y-scroll lg:overscroll-none pl-2 lg:pl-4 h-full">
                <Header />

                <div className="py-3 px-1 lg:pr-5 mb-20 lg:mb-0">
                  <Routes>
                    <Route path="/"            element={<Top />} />
                    <Route path="/workout/:id" element={<Workout />} />
                    <Route path="/records"     element={<Records />} />
                    <Route path="/profile"     element={<Profile />} />
                  </Routes>
                </div>

                <div className="block lg:hidden">
                  <Footer />
                </div>
              </div>
            </div>

            {/* サイドメニュー */}
            <div className="hidden lg:block border-l border-gray-500 py-16 w-1/4 overflow-y-scroll overscroll-none px-2">
              <SideMenu />
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
