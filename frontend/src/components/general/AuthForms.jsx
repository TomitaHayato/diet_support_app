import LoginForm from "./LoginForm";
import SignupModal from "./SignupModal";

function AuthForms(props) {
  // eslint-disable-next-line react/prop-types
  const {setUserInfo} = props;

  return (
    <>
      {/* ログインフォーム */}
      <div>
        <p className="text-lg text-center font-semibold mb-3">ログイン</p>
        <LoginForm
          setUserInfo={setUserInfo}
        />
        <div className="divider text-xs text-gray-500 font-medium my-3">OR</div>
        <SignupModal
          setUserInfo={setUserInfo}
        />
      </div>
    </>
  )
}

export default AuthForms;