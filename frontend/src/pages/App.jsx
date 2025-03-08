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
          <div className="flex px-2 lg:px-8 mx-auto h-full">
            <div className="lg:basis-9/12 w-full overflow-y-scroll overscroll-none">
              <Header />

              <div className="py-3 px-1 lg:pr-5">
                <Routes>
                  <Route path="/"            element={<Top />} />
                  <Route path="/workout/:id" element={<Workout />} />
                </Routes>
              </div>
            </div>

            {/* サイドメニュー */}
            <div className="border-l border-gray-500 py-16 px-1 hidden lg:block basis-3/12 w-full overflow-y-scroll overscroll-none">
              <SideMenu />
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;
