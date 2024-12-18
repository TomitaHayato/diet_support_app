import { useState } from "react";
import { getUser, signUp } from "../../utils/auth";
import Cookies from "js-cookie";

function SignupModal(props) {
  // eslint-disable-next-line react/prop-types
  const {setUserInfo} = props;

  const [name                , setName                ] = useState("");
  const [email               , setEmail               ] = useState("");
  const [password            , setPassword            ] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const register = async () => {
    try {
      const params = {name, email, password, passwordConfirmation}
      const res = await signUp(params);
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client"      , res.headers["client"]);
      Cookies.set("_uid"         , res.headers["uid"]);
      console.log('登録完了')
      console.log(res.data);
      //ユーザー情報を取得
      const resUser = await getUser();
      setUserInfo(resUser.data);
    } catch(error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        <p className="text-sm text-center mb-2">アカウント未登録の方はこちら</p>
        <button className="btn btn-outline btn-accent w-full" onClick={()=>document.getElementById('signup-form').showModal()}>
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
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
            >
              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-uiw-user"/>
                <input type="text" className="grow" placeholder="もちもち太郎"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              {/* <label className="input input-bordered flex items-center gap-2 mb-8">
                <p className="text-gray-500">kg</p>
                <input type="number" className="grow" placeholder="50" />
              </label> */}

              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-mail"/>
                <input type="email" className="grow" placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-8">
                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-8">

                <i className="i-lucide-key-round"/>
                <input type="password" className="grow" placeholder="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
