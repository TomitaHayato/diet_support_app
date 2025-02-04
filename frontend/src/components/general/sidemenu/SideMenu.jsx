import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../../../Contexts/Contexts";
import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./beforeLoginContents";
import HrTag from "./HrTag";
import ThemeChangeBtn from "./ThemeChangeBtn";

function SideMenu() {
  const {currentUser} = useContext(AuthContext);

  const [contents, setContents] = useState()

  // ログイン前後で表示を変更
  useEffect(() => {
    setContents(currentUser ? <LoggedInContents /> : <BeforeLoginContents />);
  }, [currentUser])

  return (
    <>
      {contents}

      <HrTag />

      <ThemeChangeBtn />

      <HrTag />
    </>
  )
}

export default SideMenu;
