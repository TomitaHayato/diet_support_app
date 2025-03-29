import { useSelector } from "react-redux";
import LoginForm from "./auth_form/LoginForm";
import SignupModal from "./auth_form/SignupModal";
import Section from "./Section";
import { selectTheme } from "../../../Redux/Slice/ThemeSlice";
import { grayText } from "../../../utils/style";

function BeforeLoginContents() {
  const theme = useSelector(selectTheme);

  return(
    <>
      <Section>
        <p className="text-lg text-center font-semibold mb-2">ログイン / 新規登録</p>

        <div className="mb-3 w-full">
          <a href="/policy" className="link link-info text-sm text-center block">プライバシーポリシー</a>
        </div>

        <LoginForm />
        <div className={`divider text-xs font-medium my-3 ${grayText(theme)}`}>OR</div>
        <SignupModal />
      </Section>
    </>
  )
}

export default BeforeLoginContents;
