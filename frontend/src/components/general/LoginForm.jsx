import { useState } from "react";
import { getUser, signIn } from "../../utils/auth";
import Cookies from "js-cookie";

function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const {setUserInfo} = props;

  const [email   , setEmail   ] = useState("");
  const [password, setPassword] = useState(""); 

  const login = async() => {
    try {
      const params = { email, password }
      const res = await signIn(params);
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client"      , res.headers["client"]);
      Cookies.set("_uid"         , res.headers["uid"]);
      console.log(res.data)
      // ユーザー情報を取得
      const resUser = await getUser();
      setUserInfo(resUser.data);
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
        <label className="input input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-mail" />
          <input type="email" className="grow" placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-3">
          <i className="i-lucide-key-round" />
          <input type="password" className="grow" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <input type="submit" className="btn btn-outline btn-primary w-full" />
      </form>
    </>
  )
}

export default LoginForm;