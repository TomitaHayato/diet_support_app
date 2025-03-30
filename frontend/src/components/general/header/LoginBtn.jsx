import { useSelector } from "react-redux";
import LoginForm from "../sidemenu/auth_form/LoginForm";
import SignupForm from "../sidemenu/auth_form/SignupForm";
import { selectTheme } from "../../../Redux/Slice/ThemeSlice";
import { bgColor, grayText } from "../../../utils/style";

export default function LoginBtn() {
  const theme = useSelector(selectTheme);

  return (
    <>
      <button className="btn btn-sm md:btn-md btn-success text-xs" onClick={() => document.getElementById('login-modal-mobile').showModal()}>
        <span>login</span>
        <i className="i-lucide-log-in"/>
      </button>

       {/* モーダルコンテンツ */}
      <dialog id="login-modal-mobile" className="modal">
        <div className={`modal-box w-3/4 h-2/3 ${bgColor(theme)}`}>
          {/* 閉じるボタン */}
          <div className="modal-action flex justify-end">
            <form method="dialog">
              <button className="btn">
                <i className="i-uiw-close text-red-500 font-bold"/>
              </button>
            </form>
          </div>

          <div className="mb-5">
            <h3 className="font-bold text-lg text-center mb-3">ログイン</h3>
            <LoginForm />
          </div>

          <div className={`divider text-xs font-medium my-3 ${grayText(theme)}`}>OR</div>

          <div className="mb-5">
            <SignupForm />
          </div>
        </div>

        {/* モーダル外部Clickで閉じる */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
