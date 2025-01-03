import { useContext, useState } from "react";
import { getUser, signIn } from "../../utils/auth";
import Cookies from "js-cookie";
import AuthContext from "../../Contexts/AuthContext";

function LoginForm() {
  const {setAuthInfo} = useContext(AuthContext);

  const [email   , setEmail   ] = useState("");
  const [password, setPassword] = useState(""); 

  const login = async() => {
    try {
      //ログイン処理
      const params = { email, password }
      const res = await signIn(params);
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client"      , res.headers["client"]);
      Cookies.set("_uid"         , res.headers["uid"]);
      // ユーザー情報を取得
      const resUser = await getUser();
      setAuthInfo(resUser.data);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <label className="input input-sm input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-mail" />
          <input type="email" className="grow" placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-sm input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-key-round" />
          <input type="password" className="grow" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <input type="submit" className="btn btn-sm btn-outline btn-primary w-full" value="ログイン" />
      </form>
    </>
  )
}

export default LoginForm;