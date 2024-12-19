import LoginForm from "./LoginForm";
import SignupModal from "./SignupModal";

function AuthForms() {
  return (
    <>
      {/* ログインフォーム */}
      <div>
        <p className="text-lg text-center font-semibold mb-3">ログイン</p>
        <LoginForm />
        <div className="divider text-xs text-gray-500 font-medium my-3">OR</div>
        <SignupModal />
      </div>
    </>
  )
}

export default AuthForms;