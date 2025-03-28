import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./BeforeLoginContents";
import ThemeChangeBtn from "./ThemeChangeBtn";
import Section from "./Section";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/Slice/currentUserSlice";

function SideMenu() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <Section>
        <div className="flex justify-center gap-4">
          <p className="font-semibold text-gray-500">テーマ変更</p>
          <ThemeChangeBtn />
        </div>
      </Section>

      {currentUser ? <LoggedInContents /> : <BeforeLoginContents />}
    </>
  )
}

export default SideMenu;
