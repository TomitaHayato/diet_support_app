import { useContext, useEffect, useState} from "react";
import AuthForms from "./auth_form/AuthForms";
import LogoutForm from "./auth_form/LogoutForm";
import { AuthContext, SideMenuContext } from "../../../Contexts/Contexts";
import UserZone from "./UserZone";
import DataCharts from "./charts/DataCharts";
import TodayData from "./TodayData";

function SideMenu() {
  const {authInfo       } = useContext(AuthContext);
  const {theme, setTheme} = useContext(SideMenuContext);

  const [themeCheck, setThemeCheck] = useState(theme === "retro" ? false : true)

  const [authFormContent, setAuthFormContent] = useState("");
  const [userZoneContent, setUserZoneContent] = useState("");
  const [userDataContent, setUserDataContent] = useState("");
  const [todayDataContent, setTodayDataContent] = useState("");

  function changeTheme(isChecked) {
    if(isChecked) {
      setTheme("dark");
      setThemeCheck(true);
    } else {
      setTheme("retro");
      setThemeCheck(false);
    }
  }

  // ログイン前後で表示を変更
  useEffect(() => {
    setAuthFormContent(authInfo.isLogin  ? <LogoutForm /> : <AuthForms />);
    setUserZoneContent(authInfo.isLogin  ? <UserZone />   : "");
    setUserDataContent(authInfo.isLogin  ? <DataCharts /> : "");
    setTodayDataContent(authInfo.isLogin ? <TodayData /> : "")
  }, [authInfo])

  return (
    <>
      <div className="mb-5">
        {todayDataContent}
      </div>

      <div className="mb-5">
        {userDataContent}
      </div>

      <div className="mb-5">
        {userZoneContent}
      </div>

      <hr className="mb-3 border-gray-400"/>

      <div className="flex justify-center gap-4 mb-5">
        <p>テーマ変更</p>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" checked={themeCheck} onChange={(e) => changeTheme(e.target.checked)} />
          <i className="i-lucide-sun swap-off h-6 w-6 fill-current" />
          <i className="i-lucide-moon swap-on h-6 w-6 fill-current"/>
        </label>
      </div>

      <div className="mb-5">
        {authFormContent}
      </div>
    </>
  )
}

export default SideMenu;
