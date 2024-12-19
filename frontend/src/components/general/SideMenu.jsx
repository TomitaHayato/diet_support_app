/* eslint-disable react/prop-types */
import { useContext } from "react";
import { isEmptyObj } from "../../utils/objectControl";
import AuthForms from "./AuthForms";
import LogoutForm from "./LogoutForm";
import AuthContext from "../../Contexts/AuthContext";

function SideMenu() {
  const {authInfo} = useContext(AuthContext);

  let renderingContent = "";

  if (!isEmptyObj(authInfo)) {
    renderingContent = authInfo.isLogin ? <LogoutForm/> : <AuthForms/>
  }

  return (
    <>
      <div>
        {renderingContent}
      </div>
    </>
  )
}

export default SideMenu;
