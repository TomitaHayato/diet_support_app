import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import { useCallback, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { getUser } from "../utils/auth";
import { isEmptyObj } from "../utils/objectControl";

function App() {
  const [authInfo, setAuthInfo] = useState({})
  let currentUser = false;

  if(!isEmptyObj(authInfo) && authInfo.isLogin) {
    currentUser = authInfo.data;
  }

  // ユーザーの認証情報を取得
  const firstSetUserInfo = useCallback(
    async () => {
      const res = await getUser();
      setAuthInfo(res.data)
      console.log("サーバからデータを取得しました")
    }, [setAuthInfo]
  )

  useEffect(() => {
    if(isEmptyObj(authInfo)) {
      firstSetUserInfo();
    }
  }, [authInfo, firstSetUserInfo])

  return (
    <>
      <AuthContext.Provider value={{authInfo, setAuthInfo, currentUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/"            element={<Top />} />
            <Route path="/workout/:id" element={<Workout />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App;
