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
            <h2 className="text-center text-xl mb-3">アカウント新規作成</h2>
            <form action="">
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-uiw-user"/>
                <input type="text" className="grow" placeholder="もちもち太郎" />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-8">
                <p className="text-gray-500">kg</p>
                <input type="number" className="grow" placeholder="50" />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-mail"/>
                <input type="email" className="grow" placeholder="user@example.com" />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password" />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password Confirmation" />
              </label>

              <input type="submit" className="btn btn-accent btn-outline w-full" />
            </form>
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