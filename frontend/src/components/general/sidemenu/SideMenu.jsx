import { useEffect, useState} from "react";
import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./beforeLoginContents";
import HrTag from "./HrTag";
import ThemeChangeBtn from "./ThemeChangeBtn";
import { useAuth } from "../../../Contexts/AuthsContext";

function SideMenu() {
  const {currentUser} = useAuth();

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
