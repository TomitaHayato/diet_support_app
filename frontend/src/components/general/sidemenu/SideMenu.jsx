import { useContext, useEffect, useState} from "react";
import { AuthContext, SideMenuContext } from "../../../Contexts/Contexts";
import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./beforeLoginContents";
import HrTag from "./HrTag";

function SideMenu() {
  const {currentUser} = useContext(AuthContext);
  const {theme, setTheme} = useContext(SideMenuContext);

  const [contents, setContents] = useState()

  // ログイン前後で表示を変更
  useEffect(() => {
    setContents(currentUser  ? <LoggedInContents /> : <BeforeLoginContents />);
  }, [currentUser])

  return (
    <>
      {contents}

      <HrTag />

      <div className="flex justify-center gap-4 mb-5">
        <p>テーマ変更</p>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" checked={theme === "dark"} onChange={() => setTheme(theme === "retro" ? "dark" : "retro")} />
          <i className="i-lucide-sun swap-off h-6 w-6 fill-current" />
          <i className="i-lucide-moon swap-on h-6 w-6 fill-current"/>
        </label>
      </div>

      <HrTag />
    </>
  )
}

export default SideMenu;
