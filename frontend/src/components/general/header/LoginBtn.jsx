import LoginForm from "../sidemenu/auth_form/LoginForm";
import SignupForm from "../sidemenu/auth_form/SignupForm";

export default function LoginBtn() {
  return (
    <>
      <button className="btn btn-sm btn-outline text-xs" onClick={() => document.getElementById('login-modal-mobile').showModal()}>
        <span>login</span>
        <i className="i-lucide-log-in"/>
      </button>

       {/* モーダルコンテンツ */}
      <dialog id="login-modal-mobile" className="modal">
        <div className="modal-box">
          {/* 閉じるボタン */}
          <div className="modal-action flex justify-end">
            <form method="dialog">
              <button className="btn">
                <i className="i-uiw-close text-red-500 bg-base-100"/>
              </button>
            </form>
          </div>

          <div className="mb-5">
            <h3 className="font-bold text-lg text-center mb-3">ログイン</h3>
            <LoginForm />
          </div>

          <div className="divider text-xs text-gray-500 font-medium my-3">OR</div>

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
