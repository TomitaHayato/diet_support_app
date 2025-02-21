import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./beforeLoginContents";
import ThemeChangeBtn from "./ThemeChangeBtn";
import Section from "./Section";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/Slice/currentUserSlice";

function SideMenu() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <Section><ThemeChangeBtn /></Section>

      {currentUser ? <LoggedInContents /> : <BeforeLoginContents />}
    </>
  )
}

export default SideMenu;
