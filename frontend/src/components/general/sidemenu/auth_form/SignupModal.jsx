import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../../../Redux/Slice/currentUserSlice";
import { useState } from "react";
import { putDev } from "../../../../utils/devTool";

function SignupModal() {
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerReq = async (params) => {
    try {
      dispatch(signupThunk(params));
    } catch(error) {
      putDev(error);
      setSignupError('新規登録に失敗しました');
    }
  }

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

            {/* フォーム */}
            <h2 className="text-center text-xl mb-3">アカウント新規作成</h2>
            <form onSubmit={handleSubmit(registerReq)}>
              <p className="text-red-500 text-lg" role="error-message" aria-label="signup-error">{signupError}</p>

              {errors.name?.message && (<p className="text-red-500" role="error" aria-label="signup-name-error">{errors.name?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-uiw-user"/>
                <input type="text" className="grow" placeholder="もちもち太郎"
                  aria-label="signup-name"
                  {...register("name", { required: '*名前を入力してください' })}
                />
              </label>

              {errors.email?.message && (<p className="text-red-500" role="error" aria-label="signup-email-error">{errors.email?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-mail"/>
                <input type="email" className="grow" placeholder="user@example.com"
                  aria-label="signup-email"
                  {...register("email", { required: '*メールアドレスを入力してください' })}
                />
              </label>

              {errors.password?.message && (<p className="text-red-500" role="error" aria-label="signup-password-error">{errors.password?.message}</p>)}
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

              {errors.passwordConfirmation?.message && (<p className="text-red-500" role="error" aria-label="signup-password-confirmation-error">{errors.passwordConfirmation.message}</p>)}
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

              <input type="submit" aria-label="signup-submit" className="btn btn-accent btn-outline w-full"/>
            </form>
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
