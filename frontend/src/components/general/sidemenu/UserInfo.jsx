import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/Slice/currentUserSlice";
import { selectTheme } from "../../../Redux/Slice/ThemeSlice";
import { grayText } from "../../../utils/style";

function UserInfo(props) {
  const {setEditMode} = props;
  const currentUser = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);  

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center gap-3 mb-2">
          <p className={`font-semibold ${grayText(theme)}`}>プロフィール</p>
          <button aria-label="edit-mode-btn" onClick={() => setEditMode(true)}>
            <i className="i-uiw-edit hover:scale-110 hover:bg-white active:scale-95" />
          </button>
        </div>
        
        <p className="mb-2" role="user-info" aria-label="name">名前: {currentUser.name}</p>
        <p className="mb-2" role="user-info" aria-label="weight">体重: {`${currentUser.weight} kg`}</p>
        <p className="mb-2" role="user-info" aria-label="email">email: ****</p>
      </div>
    </>
  )
}

export default UserInfo;
