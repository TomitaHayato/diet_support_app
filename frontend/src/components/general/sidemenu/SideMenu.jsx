import { useContext, useEffect, useState} from "react";
import AuthForms from "./auth_form/AuthForms";
import LogoutForm from "./auth_form/LogoutForm";
import { AuthContext, SideMenuContext } from "../../../Contexts/Contexts";
import UserZone from "./UserZone";
import DataCharts from "./charts/DataCharts";
import TodayData from "./TodayData";

function SideMenu() {
  const {currentUser} = useContext(AuthContext);
  const {theme, setTheme} = useContext(SideMenuContext);

  const [authFormContent , setAuthFormContent ] = useState("");
  const [userZoneContent , setUserZoneContent ] = useState("");
  const [userDataContent , setUserDataContent ] = useState("");
  const [todayDataContent, setTodayDataContent] = useState("");

  // ログイン前後で表示を変更
  useEffect(() => {
    setAuthFormContent(currentUser  ? <LogoutForm /> : <AuthForms />);
    setUserZoneContent(currentUser  ? <UserZone />   : "");
    setUserDataContent(currentUser  ? <DataCharts /> : "");
    setTodayDataContent(currentUser ? <TodayData />  : "");
  }, [currentUser])

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
          <input type="checkbox" className="theme-controller" checked={theme === "dark"} onChange={() => setTheme(theme === "retro" ? "dark" : "retro")} />
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
