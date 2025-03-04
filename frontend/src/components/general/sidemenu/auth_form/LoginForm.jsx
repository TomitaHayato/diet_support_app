import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../../Redux/Slice/currentUserSlice";
import { putDev } from "../../../../utils/devTool";

function LoginForm() {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginError, setLoginError] = useState(null);

  const login = async(params) => {
    try {
      dispatch(loginThunk(params));
      setLoginError(null);
    } catch(error) {
      putDev('login');
      putDev(error);
      setLoginError('ログインできませんでした。');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(login)} >
        {loginError && <p className="text-red-500 text-lg" role="error-message" aria-label="login-error">{loginError}</p>}

        {errors.email?.message && (<p className="text-red-500" role="error" aria-label="login-email-error">{errors.email.message}</p>)}
        <label className="input input-sm input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-mail" />
          <input type="email" className="grow" placeholder="Email" aria-label="login-email"
            {...register('email', {
              required: 'メールアドレスを入力してください',
            })} />
        </label>

        {errors.password?.message && (<p className="text-red-500" role="error" aria-label="login-password-error">{errors.password.message}</p>)}
        <label className="input input-sm input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-key-round" />
          <span role="pass" aria-label="login-password">
            <input type="password" className="grow" placeholder="Password" aria-label="login-password"
            {...register('password', {
              required: 'パスワードを入力してください',
            })} />
          </span>
        </label>

        <input type="submit" className="btn btn-sm btn-outline btn-primary w-full" value="ログイン" />
      </form>
    </>
  )
}

export default LoginForm;