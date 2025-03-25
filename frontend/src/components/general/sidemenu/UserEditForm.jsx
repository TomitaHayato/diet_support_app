import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateUserThunk } from "../../../Redux/Slice/currentUserSlice";
import { putDev } from "../../../utils/devTool";
import { selectCsrfToken } from "../../../Redux/Slice/csrfTokenSlice";

function UserEditForm(props) {
  const {setEditMode} = props;
  const currentUser = useSelector(selectCurrentUser);
  const csrfToken   = useSelector(selectCsrfToken);

  const dispatch = useDispatch();

  const [errorUser, setErrorUser] = useState(null);

  const {register, handleSubmit, formState: {errors}} = useForm();

  // ユーザ情報の更新処理
  const requestUsersUpdate = async(params) => {
    try {
      dispatch(updateUserThunk({params, csrfToken}))
      setEditMode(false);
      setErrorUser(null);
    } catch(error) {
      putDev('requestUsersUpdate')
      putDev(error);
      setErrorUser('プロフィール編集に失敗しました');
    }
  }

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center gap-3 mb-2">
          <p className="text-lg">プロフィール編集</p>
          <button aria-label="info-mode-btn" onClick={() => setEditMode(false)}>
            <i className="i-uiw-close hover:scale-110 hover:bg-red-500 active:scale-95" />
          </button>
        </div>

        <p className="text-red-500 text-lg" role="error-message" aria-label="user-update-error">{errorUser}</p>
        <form onSubmit={handleSubmit(requestUsersUpdate)}>
          <input type="hidden" value={currentUser.id} {...register('id')}/>

          {errors.name?.message && (<p role="error" aria-label="name" className="text-red-500">{errors.name.message}</p>)}
          <label className="input input-sm input-bordered flex items-center gap-2 mb-2">
            名前
            <input type="text" className="grow" defaultValue={currentUser.name}
              {...register('name', {required: '*名前を入力してください'})}/>
          </label>

          {errors.weight?.message && (<p role="error" aria-label="weight" className="text-red-500">{errors.weight.message}</p>)}
          <label className="input input-sm input-bordered flex items-center gap-2 mb-2">
            体重
            <input type="number" className="grow" defaultValue={currentUser.weight}
              {...register('weight', {required: '*体重を入力してください', min: {value: 0, message: '*0以上の整数を入力してください'}})}/>
          </label>

          {errors.email?.message && (<p role="error" aria-label="email" className="text-red-500">{errors.email.message}</p>)}
          <label className="input input-sm input-bordered flex items-center gap-2 mb-2">
            メール
            <input type="email" className="grow" defaultValue={currentUser.email}
              {...register('email', {required: 'メールアドレスを入力してください'})}/>
          </label>

          <button aria-label="user-update-btn" className="btn btn-sm btn-info btn-outline w-full mb-2">
            更新する
          </button>
        </form>
      </div>
    </>
  )
}

export default UserEditForm;
