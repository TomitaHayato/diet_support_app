import { useContext } from "react";
import AuthContext from "../../Contexts/AuthContext";

function UserInfo(props) {
  // eslint-disable-next-line react/prop-types
  const {setEditMode} = props;
  const {currentUser} = useContext(AuthContext);

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center gap-3 mb-2">
          <p className="text-lg">プロフィール</p>
          <button onClick={() => setEditMode(true)}>
            <i className="i-uiw-edit hover:scale-110 hover:bg-white active:scale-95" />
          </button>
        </div>
        
        <p className="mb-2">名前: {currentUser.name}</p>
        <p className="mb-2">体重: {`${currentUser.weight} kg`}</p>
        <p className="mb-2">email: ****</p>
      </div>
    </>
  )
}

export default UserInfo;
