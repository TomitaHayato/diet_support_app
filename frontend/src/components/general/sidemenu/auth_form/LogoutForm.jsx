import { logoutThunk } from "../../../../Redux/Slice/currentUserSlice";
import { useDispatch } from "react-redux";

function LogoutForm() {
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(logoutThunk());
    } catch(e) {
      alert(e);
    }
  }

  return (
    <>
      <p className="text-lg text-center mb-2">ログアウト</p>
      <button className="btn btn-sm btn-outline w-full" onClick={signOut}>ログアウト</button>
    </>
  )
}

export default LogoutForm;
