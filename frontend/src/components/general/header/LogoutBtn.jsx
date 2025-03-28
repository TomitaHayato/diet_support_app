import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../../Redux/Slice/currentUserSlice";
import { putDev } from "../../../utils/devTool";
import { selectCsrfToken } from "../../../Redux/Slice/csrfTokenSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const token = useSelector(selectCsrfToken);

  const signOut = async () => {
    try {
      dispatch(logoutThunk(token));
    } catch(e) {
      putDev(e);
    }
  }

  return(
    <button onClick={signOut} className="btn btn-sm btn-outline text-xs px-1.5">
      <span>logout</span>
      <i className="i-lucide-log-out"/>
    </button>
  )
}