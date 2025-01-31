import { useContext } from "react";
import { getUser, signUp } from "../../../../utils/auth";
import Cookies from "js-cookie";
import { AuthContext } from "../../../../Contexts/Contexts";
import { useForm } from "react-hook-form";

function SignupModal() {
  const {setCurrentUser} = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerReq = async (params) => {
    try {
      // リクエストを送信
      const res = await signUp(params);
      // レスポンスからトークンを取得し、Cookieに保存
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client"      , res.headers["client"]);
      Cookies.set("_uid"         , res.headers["uid"]);
      // console.log(res.data);
      // ユーザー情報を取得
      const resUser = await getUser();
      setCurrentUser(resUser.data);
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

        <dialog id="signup-form" className="modal">
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
                  {...register("name", { required: '*名前を入力してください' })}
                />
              </label>

              {errors.email?.message && (<p className="text-red-500">{errors.email?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-mail"/>
                <input type="email" className="grow" placeholder="user@example.com"
                  {...register("email", { required: '*メールアドレスを入力してください' })}
                />
              </label>

              {errors.password?.message && (<p className="text-red-500">{errors.password?.message}</p>)}
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password"
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
