import { useContext } from "react";
import { logout, removeAuthToken } from "../../../../utils/auth";
import { AuthContext } from "../../../../Contexts/Contexts";

function LogoutForm() {
  const {setCurrentUser} = useContext(AuthContext);

  const signOut = async () => {
    try {
      await logout();
      removeAuthToken();
      setCurrentUser(false);
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
