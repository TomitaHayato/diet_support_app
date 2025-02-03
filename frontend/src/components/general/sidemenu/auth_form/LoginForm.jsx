import { useContext, useState } from "react";
import { settingAuthTokenToCookie, signIn } from "../../../../utils/auth";
import { AuthContext } from "../../../../Contexts/Contexts";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {setCurrentUser} = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginError, setLoginError] = useState(null);

  const login = async(params) => {
    try {
      // ログインリクエスト
      const res = await signIn(params);
      // 認証情報をセット
      settingAuthTokenToCookie(res)
      setCurrentUser(res.data.data);
      setLoginError(null);
    } catch(error) {
      console.log(error);
      setLoginError('ログインできませんでした。');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(login)} >
        <p className="text-red-500 text-lg">{loginError}</p>

        {errors.email?.message && (<p className="text-red-500">{errors.email.message}</p>)}
        <label className="input input-sm input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-mail" />
          <input type="email" className="grow" placeholder="Email"
            {...register('email', {required: 'メールアドレスを入力してください'})}
          />
        </label>

        {errors.password?.message && (<p className="text-red-500">{errors.password.message}</p>)}
        <label className="input input-sm input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-key-round" />
          <input type="password" className="grow" placeholder="Password"
            aria-label="login-password" role="passwordbox"
            {...register('password', {required: 'パスワードを入力してください'})}
          />
        </label>

        <input type="submit" className="btn btn-sm btn-outline btn-primary w-full" value="ログイン" />
      </form>
    </>
  )
}

export default LoginForm;