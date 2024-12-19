/* eslint-disable react/prop-types */
import { useContext } from "react";
import { logout } from "../../utils/auth";
import AuthContext from "../../Contexts/AuthContext";

function LogoutForm() {
  const {setAuthInfo} = useContext(AuthContext);

  const signOut = async () => {
    try {
      await logout();
      console.log('ログアウトしました')
      setAuthInfo({});
    } catch(e) {
      alert(e);
    }
  }

  return (
    <>
      <p className="text-lg text-center mb-3">ログアウト</p>
      <button className="btn btn-outline w-full" onClick={signOut}>ログアウト</button>
    </>
  )
}

export default LogoutForm;
