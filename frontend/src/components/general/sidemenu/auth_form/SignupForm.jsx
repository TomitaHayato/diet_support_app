import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../../../../Redux/Slice/currentUserSlice";
import { putDev } from "../../../../utils/devTool";
import { selectCsrfToken } from "../../../../Redux/Slice/csrfTokenSlice";
import { modalOpen } from "../../../../utils/modalCtl";

export default function SignupForm() {
  const dispatch = useDispatch();
  const csrfToken = useSelector(selectCsrfToken);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signupError  , setSignupError  ] = useState(null);
  const [isAgreePolicy, setIsAgreePolicy] = useState(false);

  const registerReq = async (params) => {
    try {
      dispatch(signupThunk({params, csrfToken}));
    } catch(error) {
      putDev(error);
      setSignupError('新規登録に失敗しました');
    }
  }

  function hundleLinkToPolicy() {
    modalOpen('policy-content')
  }

  function hundleClickAgree() {
    setIsAgreePolicy(prev => !prev);
  }

  return(
    <>
      {/* フォーム */}
      <h2 className="text-center text-lg md:text-xl mb-3 font-semibold">アカウント新規作成</h2>
      <form onSubmit={handleSubmit(registerReq)}>
        <p className="text-red-500 text-lg" role="error-message" aria-label="signup-error">{signupError}</p>

        {errors.name?.message && (<p className="text-red-500" role="error" aria-label="signup-name-error">{errors.name?.message}</p>)}
        <label className="input input-bordered flex items-center gap-2 mb-3 md:mb-8 input-sm md:input-md">
          <i className="i-uiw-user"/>
          <input type="text" className="grow" placeholder="もちもち太郎"
            aria-label="signup-name"
            {...register("name", { required: '*名前を入力してください' })}
          />
        </label>

        {errors.email?.message && (<p className="text-red-500" role="error" aria-label="signup-email-error">{errors.email?.message}</p>)}
        <label className="input input-bordered flex items-center gap-2 mb-3 md:mb-8 input-sm md:input-md">
          <i className="i-lucide-mail"/>
          <input type="email" className="grow" placeholder="user@example.com"
            aria-label="signup-email"
            {...register("email", { required: '*メールアドレスを入力してください' })}
          />
        </label>

        {errors.password?.message && (<p className="text-red-500" role="error" aria-label="signup-password-error">{errors.password?.message}</p>)}
        <label className="input input-bordered flex items-center gap-2 mb-3 md:mb-8 input-sm md:input-md">
          <i className="i-lucide-key-round"/>
          <input type="password" className="grow" placeholder="Password（6文字以上）"
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
        <label className="input input-bordered flex items-center gap-2 mb-3 input-sm md:input-md">
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

        <div className="mb-3 w-full">
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input type="checkbox" aria-label="policy-agree"
                className="checkbox checkbox-info checkbox-sm"
                checked={isAgreePolicy}
                onChange={hundleClickAgree} />

              <p className="label-text text-xs sm:text-sm">
                <button type="button" className="link link-info text-center inline-block" onClick={hundleLinkToPolicy}>プライバシーポリシー</button>
                を確認しました
              </p>
            </label>
          </div>
        </div>

        <input type="submit" aria-label="signup-submit" disabled={!isAgreePolicy} className="btn btn-primary btn-outline w-full btn-sm md:btn-md"/>
      </form>
    </>
  );
}
