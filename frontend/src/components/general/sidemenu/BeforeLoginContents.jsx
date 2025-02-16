import LoginForm from "./auth_form/LoginForm";
import SignupModal from "./auth_form/SignupModal";
import Section from "./Section";

function BeforeLoginContents() {
  return(
    <>
      <Section>
        <p className="text-lg text-center font-semibold mb-3">ログイン / 新規登録</p>
        <LoginForm />
        <div className="divider text-xs text-gray-500 font-medium my-3">OR</div>
        <SignupModal />
      </Section>
    </>
  )
}

export default BeforeLoginContents;
