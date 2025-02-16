import LoggedInContents from "./LoggedInContents";
import BeforeLoginContents from "./beforeLoginContents";
import ThemeChangeBtn from "./ThemeChangeBtn";
import { useAuth } from "../../../Contexts/AuthsContext";
import Section from "./Section";

function SideMenu() {
  const {currentUser} = useAuth();

  return (
    <>
      <Section><ThemeChangeBtn /></Section>

      {currentUser ? <LoggedInContents /> : <BeforeLoginContents />}
    </>
  )
}

export default SideMenu;
