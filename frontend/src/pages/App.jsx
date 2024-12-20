import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import { useCallback, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { getUser } from "../utils/auth";
import { isEmptyObj } from "../utils/objectControl";

function App() {
  const [authInfo, setAuthInfo] = useState({})
  const [weight  , setWeight  ] = useState(50)
  const [theme   , setTheme   ] = useState("retro")

  let currentUser = authInfo?.isLogin ? authInfo.data : false;

  useEffect(() => {
    const userWeight = authInfo.data?.weight
    if(userWeight) {
      setWeight(userWeight);
    }
  }, [authInfo])

  // ユーザーの認証情報を取得
  const firstSetUserInfo = useCallback(
    async () => {
      // 認証リクエスト + 認証情報をセット
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
        <AuthContext.Provider value={{authInfo, setAuthInfo, currentUser, weight, setWeight, theme, setTheme}}>
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
