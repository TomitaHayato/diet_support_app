/* eslint-disable react/prop-types */
import { logout } from "../../utils/auth";

function LogoutForm(props) {
  const {setUserInfo} = props;

  const signOut = async () => {
    try {
      const res = await logout();
      console.log(res.data);
      setUserInfo({});
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
