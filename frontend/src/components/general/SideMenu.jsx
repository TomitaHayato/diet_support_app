/* eslint-disable react/prop-types */
import { isEmptyObj } from "../../utils/objectControl";
import AuthForms from "./AuthForms";
import LogoutForm from "./LogoutForm";

function SideMenu(props) {
  const {userInfo, setUserInfo} = props;

  let renderingContent = ""

  if (!isEmptyObj(userInfo)) {
    renderingContent = userInfo.isLogin ? <LogoutForm setUserInfo={setUserInfo}/> : <AuthForms setUserInfo={setUserInfo}/>
  }

  return (
    <>
      <div className="basis-3/12">
        {renderingContent}
      </div>
    </>
  )
}

export default SideMenu;
