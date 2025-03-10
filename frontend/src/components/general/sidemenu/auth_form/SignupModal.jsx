import SignupForm from "./SignupForm";

function SignupModal() {

  return (
    <>
      <div>
        <p className="text-sm text-center mb-2">アカウント未登録の方はこちら</p>
        <button className="btn btn-sm btn-outline btn-accent w-full" aria-label="signup-modal-open-button"
          onClick={()=>document.getElementById('signup-form').showModal()}>アカウント新規作成
        </button>

        <dialog id="signup-form" className="modal">
          <div className="modal-box" role="modalbox" aria-label="signup-modalbox">
            {/* Close ボタン */}
            <form method="dialog">
              <button aria-label="modal-close-button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <SignupForm />
            
          </div>

          {/* 外部クリックで閉じる  */}
          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>
      </div>
    </>
  )
}

export default SignupModal;
