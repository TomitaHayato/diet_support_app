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
import FooterMenu from "../components/general/footer/FooterMenu";
import Records from "./mobile/Records";
import Profile from "./Profile";
import Footer from "../components/general/footer/Footer";
import Terms from "../components/general/Terms";
import Policy from "../components/general/Policy";
import { getCsrfTokenThunk } from "../Redux/Slice/csrfTokenSlice";
import PolicyPage from "./PolicyPage";
import { bgColor, grayText } from "../utils/style";

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
    dispatch(getCsrfTokenThunk()); // CSRF tokenを更新
    if(currentUser) {
      dispatch(getWorkoutRecordsThunk());
      dispatch(setWeight(currentUser.weight)); // weightにログインユーザの体重をセット
    }
  }, [currentUser, dispatch])

  return (
    <>
      <div data-theme={theme} className={`h-screen ${bgColor(theme)}`}>
        <BrowserRouter>
          <div className="flex mx-auto h-full">
            <div className="w-full lg:w-3/4">
              <div className="overflow-y-scroll lg:overscroll-none h-full">
                <div className="fixed z-10 lg:static w-full">
                  <Header />
                </div>

                <div className="py-3 px-1 lg:px-5 mb-20 lg:mb-0 mt-12 lg:mt-0">
                  <Routes>
                    <Route path="/"            element={<Top />} />
                    <Route path="/workout/:id" element={<Workout />} />
                    <Route path="/records"     element={<Records />} />
                    <Route path="/profile"     element={<Profile />} />
                    <Route path="/policy"      element={<PolicyPage />} />
                  </Routes>
                </div>

                <div className="">
                  <Footer/>
                </div>

                <div className="block lg:hidden">
                  <FooterMenu />
                </div>
              </div>
            </div>

            {/* サイドメニュー */}
            <div className="hidden lg:block border-l border-gray-500 py-16 w-1/4 overflow-y-scroll overscroll-none px-4">
              <SideMenu />
            </div>
          </div>
        </BrowserRouter>
      </div>

      {/* 利用規約 */}
      <dialog id="terms-content" className="modal">
        <div className={`modal-box text-sm w-3/4 h-3/4 ${bgColor(theme)} ${grayText(theme)}`}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-ghost absolute right-2 top-2">
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>
          </form>
          <Terms />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* プライバシーポリシー */}
      <dialog id="policy-content" className="modal">
        <div className={`modal-box text-sm w-3/4 h-3/4 ${bgColor(theme)} ${grayText(theme)}`}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-ghost absolute right-2 top-2">
              <i className="i-uiw-close text-red-500 font-bold"/>
            </button>
          </form>
          <Policy />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default App;
