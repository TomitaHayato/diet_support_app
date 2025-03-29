import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./BeforeLoginContents";
import ThemeChangeBtn from "./ThemeChangeBtn";
import Section from "./Section";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/Slice/currentUserSlice";
import { selectTheme } from "../../../Redux/Slice/ThemeSlice";
import { grayText } from "../../../utils/style";

function SideMenu() {
  const currentUser = useSelector(selectCurrentUser);
  const theme       = useSelector(selectTheme);  

  return (
    <>
      <Section>
        <div className="flex justify-center gap-4">
          <p className={`font-semibold ${grayText(theme)}`}>テーマ変更</p>
          <ThemeChangeBtn />
        </div>
      </Section>

      {currentUser ? <LoggedInContents /> : <BeforeLoginContents />}
    </>
  )
}

export default SideMenu;
