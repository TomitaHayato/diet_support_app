import { useState } from "react";
import { logoutThunk } from "../../../../Redux/Slice/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { putDev } from "../../../../utils/devTool";
import { selectCsrfToken } from "../../../../Redux/Slice/csrfTokenSlice";

function LogoutForm() {
  const dispatch = useDispatch();
  const token = useSelector(selectCsrfToken);

  const [logoutError, setLogoutError] = useState(null);

  const signOut = async () => {
    try {
      dispatch(logoutThunk(token));
    } catch(e) {
      putDev(e);
      setLogoutError('ログアウトに失敗しました')
    }
  }

  return (
    <>
      <p className="font-semibold text-gray-500 text-center mb-2">ログアウト</p>

      {logoutError && <p className="text-red-500 text-lg" role="error-message" aria-label="logout-error">{logoutError}</p>}

      <button aria-label="logout-button" className="btn btn-sm btn-outline w-full" onClick={signOut}>
        ログアウト
        <i className="i-lucide-log-out"/>
      </button>
    </>
  )
}

export default LogoutForm;
