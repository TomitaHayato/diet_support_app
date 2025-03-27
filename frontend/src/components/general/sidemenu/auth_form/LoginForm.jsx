import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, loginThunk, selectCurrentUser } from "../../../../Redux/Slice/currentUserSlice";
import { putDev } from "../../../../utils/devTool";
import { selectCsrfToken } from "../../../../Redux/Slice/csrfTokenSlice";
import { settingAuthTokenFromMessage } from "../../../../utils/auth";

function LoginForm() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const token = useSelector(selectCsrfToken); // CSRFトークンを取得

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginError, setLoginError] = useState(null);

  const login = async(params) => {
    try {
      dispatch(loginThunk({params, token}));
      setLoginError(null);
    } catch(error) {
      putDev('login');
      putDev(error);
      setLoginError('ログインできませんでした。');
    }
  }

    // Googleログイン処理のリクエストを送信
    const googleAuth = async() => {
      if(currentUser) return;
      // await client.post('/auth/developer', {}, {
      //   withCredentials: true,
      //   headers: {'X-CSRF-Token': token},
      // });
      const popup = window.open(`${import.meta.env.VITE_RAILS_API_DOMEIN}/auth/developer?omniauth_window_type=newWindow`);
  
      const sendMessage = setInterval(() => {
        if(popup && !popup.closed) {
          popup.postMessage('requestCredentials', '*');
        } else {
          clearInterval(sendMessage);
        }
      }, 500);
    }
  
    // 認証Tokenを受け取る
    window.addEventListener('message', (e) => {
      if(currentUser) return;
      if (e.origin !== 'http://localhost:3000') return;
  
      putDev(e.data);
  
      settingAuthTokenFromMessage(e.data) &&
        dispatch(fetchUserThunk())
    })

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
      
      <div className="mt-3">
        <button className="btn btn-sm btn-outline w-full" onClick={googleAuth}>Google Login</button>
      </div>
    </>
  )
}

export default LoginForm;