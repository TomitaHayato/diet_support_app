import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import { useCallback, useEffect, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { getUser } from "../utils/auth";
import { isEmptyObj } from "../utils/objectControl";

function App() {
  const [authInfo, setAuthInfo] = useState({})

  // ユーザーの認証情報を取得
  const firstSetUserInfo = useCallback(
    async () => {
      const res = await getUser();
      setAuthInfo(res.data)
    }, [setAuthInfo]
  )

  useEffect(() => {
    console.log(authInfo);
    
    if(isEmptyObj(authInfo)) {
      firstSetUserInfo();
    }
  }, [authInfo, firstSetUserInfo])

  return (
    <>
      <AuthContext.Provider value={{authInfo, setAuthInfo}}>
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
