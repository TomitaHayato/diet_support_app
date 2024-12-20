import { useContext, useState} from "react";
import { isEmptyObj } from "../../utils/objectControl";
import AuthForms from "./AuthForms";
import LogoutForm from "./LogoutForm";
import AuthContext from "../../Contexts/AuthContext";
import UserZone from "./UserZone";

function SideMenu() {
  const {authInfo, theme, setTheme} = useContext(AuthContext);
  const [themeCheck, setThemeCheck] = useState(theme === "retro" ? false : true)

  function changeTheme(isChecked) {
    if(isChecked) {
      setTheme("dark");
      setThemeCheck(true);
    } else {
      setTheme("retro");
      setThemeCheck(false);
    }
  }

  let authFormContent = "";
  let userZoneContent = "";
  // ログイン前後で表示を変更
  if (!isEmptyObj(authInfo)) {
    authFormContent = authInfo.isLogin ? <LogoutForm/> : <AuthForms/>
    userZoneContent = authInfo.isLogin ? <UserZone />  : ""
  }

  return (
    <>
      <div className="flex justify-center gap-4 mb-5">
        <p>テーマ変更</p>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" checked={themeCheck} onChange={(e) => changeTheme(e.target.checked)} />
          <i className="i-lucide-sun swap-off h-6 w-6 fill-current" />
          <i className="i-lucide-moon swap-on h-6 w-6 fill-current"/>
        </label>
      </div>

      <hr className="mb-3 border-gray-400"/>

      <div className="mb-5">
        {authFormContent}
      </div>
      
      <hr className="mb-3 border-gray-400" />

      <div className="mb-5">
        {userZoneContent}
      </div>

      <hr className="mb-3 border-gray-400"/>
    </>
  )
}

export default SideMenu;
