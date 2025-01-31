import { useContext } from "react";
import { logout } from "../../../../utils/auth";
import { AuthContext } from "../../../../Contexts/Contexts";

function LogoutForm() {
  const {setCurrentUser} = useContext(AuthContext);

  const signOut = async () => {
    try {
      await logout();
      setCurrentUser(false);
    } catch(e) {
      alert(e);
    }
  }

  return (
    <>
      <hr className="mb-3 border-gray-400"/>
  
      <p className="text-lg text-center mb-2">ログアウト</p>
      <button className="btn btn-sm btn-outline w-full" onClick={signOut}>ログアウト</button>
    </>
  )
}

export default LogoutForm;
