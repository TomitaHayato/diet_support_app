import { useContext, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import { updateUser } from "../../utils/userRequest";

function UserEditForm(props) {
  // eslint-disable-next-line react/prop-types
  const {setEditMode} = props;
  const {setAuthInfo, currentUser} = useContext(AuthContext);
  const [name, setName] = useState(currentUser.name);
  const [weight, setWeight] = useState(currentUser.weight);
  const [email, setEmail] = useState(currentUser.email);

  const requestUsersUpdate = async() => {
    const params = {name, weight, email}
    try {
      const res    = await updateUser(params, currentUser.id)
      setAuthInfo(res.data);
      setEditMode(false);
    } catch(error) {
      alert(error);
    }
  }

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center gap-3 mb-2">
          <p className="text-lg">プロフィール編集</p>
          <button onClick={() => setEditMode(false)}>
            <i className="i-uiw-close hover:scale-110 hover:bg-red-500 active:scale-95" />
          </button>
        </div>
        
        <div>
          <label className="input input-sm input-bordered flex items-center gap-2 mb-2">
            名前:
            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="input input-sm input-bordered flex items-center gap-2 mb-2">
            体重:
            <input type="integer" className="grow" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>

          <label className="input input-sm input-bordered flex items-center gap-2 mb-2">
            名前:
            <input type="email" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <button className="btn btn-sm btn-info btn-outline w-full mb-2" onClick={requestUsersUpdate}>
            更新する
          </button>
        </div>
      </div>
    </>
  )
}

export default UserEditForm;
