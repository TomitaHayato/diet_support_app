function SignupModal() {
  return (
    <>
      <div>
        <button className="btn btn-outline btn-accent w-full" onClick={()=>document.getElementById('signup-form').showModal()}>sign up</button>

        <dialog id="signup-form" className="modal">
          <div className="modal-box">
            {/* Close ボタン */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            {/* フォーム */}
            <h2>ユーザー情報登録</h2>
          </div>

          {/* 外部クリックで閉じる  */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  )
}

export default SignupModal;