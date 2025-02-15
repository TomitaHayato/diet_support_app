import { settingAuthTokenToCookie, signUp } from "../../../../utils/auth";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../Contexts/AuthsContext";

function SignupModal() {
  const {setCurrentUser} = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerReq = async (params) => {
    try {
      // リクエストを送信
      const res = await signUp(params);
      settingAuthTokenToCookie(res); // レスポンスからトークンを取得し、Cookieに保存
      setCurrentUser(res.data.data);
    } catch(error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        <p className="text-sm text-center mb-2">アカウント未登録の方はこちら</p>
        <button className="btn btn-sm btn-outline btn-accent w-full" onClick={()=>document.getElementById('signup-form').showModal()}>
          アカウント新規作成
        </button>

        <dialog id="signup-form" className="modal" aria-label="signup-form-modal">
          <div className="modal-box">
            {/* Close ボタン */}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            {/* フォーム */}
            <h2 className="text-center text-xl mb-3">アカウント新規作成</h2>
            <form
              onSubmit={handleSubmit(registerReq)}
            >
              {errors.name?.message && (<p className="text-red-500">{errors.name?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-uiw-user"/>
                <input type="text" className="grow" placeholder="もちもち太郎"
                  aria-label="signup-name"
                  {...register("name", { required: '*名前を入力してください' })}
                />
              </label>

              {errors.email?.message && (<p className="text-red-500">{errors.email?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-mail"/>
                <input type="email" className="grow" placeholder="user@example.com"
                  aria-label="signup-email"
                  {...register("email", { required: '*メールアドレスを入力してください' })}
                />
              </label>

              {errors.password?.message && (<p className="text-red-500">{errors.password?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password"
                  aria-label="signup-password" role="passwordbox"
                  {...register("password", {
                      required:  '*パスワードを入力してください。',
                      minLength: {
                        value:    6,
                        message: '6文字以上必要です',
                      }})}
                />
              </label>

              {errors.passwordConfirmation?.message && (<p className="text-red-500">{errors.passwordConfirmation.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password Confirmation"
                  aria-label="signup-password-confirmation" role="passwordbox"
                  {...register("passwordConfirmation", {
                    required:  '*パスワード確認を入力してください。',
                    minLength: {
                      value:    6,
                      message: '6文字以上必要です',
                    }})}
                />
              </label>

              <input type="submit" className="btn btn-accent btn-outline w-full"/>
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
