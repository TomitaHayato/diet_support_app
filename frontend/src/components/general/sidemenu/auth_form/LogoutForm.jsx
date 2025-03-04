import { useState } from "react";
import { logoutThunk } from "../../../../Redux/Slice/currentUserSlice";
import { useDispatch } from "react-redux";
import { putDev } from "../../../../utils/devTool";

function LogoutForm() {
  const dispatch = useDispatch();
  const [logoutError, setLogoutError] = useState(null);

  const signOut = async () => {
    try {
      dispatch(logoutThunk());
    } catch(e) {
      putDev(e);
      setLogoutError('ログアウトに失敗しました')
    }
  }

  return (
    <>
      {logoutError && <p className="text-red-500 text-lg" role="error-message" aria-label="logout-error">{logoutError}</p>}
      <p className="text-lg text-center mb-2">ログアウト</p>
      <button aria-label="logout-button" className="btn btn-sm btn-outline w-full" onClick={signOut}>ログアウト</button>
    </>
  )
}

export default LogoutForm;
