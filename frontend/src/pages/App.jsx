import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import Workout from "./Workout";
import { useState } from "react";
import AuthContext from "../Contexts/AuthContext";

function App() {
  const [authInfo, setAuthInfo] = useState({})

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
