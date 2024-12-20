import { useContext } from "react";
import { isEmptyObj } from "../../utils/objectControl";
import AuthForms from "./AuthForms";
import LogoutForm from "./LogoutForm";
import AuthContext from "../../Contexts/AuthContext";
import UserZone from "./UserZone";

function SideMenu() {
  const {authInfo} = useContext(AuthContext);

  let authFormContent = "";
  let userZoneContent = "";

  if (!isEmptyObj(authInfo)) {
    authFormContent = authInfo.isLogin ? <LogoutForm/> : <AuthForms/>
    userZoneContent = authInfo.isLogin ? <UserZone />  : ""
  }

  return (
    <>
      <div className="mb-3">
        {authFormContent}
      </div>
      
      <hr className="mb-3" />

      <div>
        {userZoneContent}
      </div>
    </>
  )
}

export default SideMenu;
