/* eslint-disable react/prop-types */
import AuthForms from "./AuthForms";
import LogoutForm from "./LogoutForm";

function SideMenu(props) {
  const {userInfo, setUserInfo} = props;

  const renderingContent = userInfo.isLogin ? <LogoutForm /> : <AuthForms setUserInfo={setUserInfo}/>

  return (
    <>
      <div className=''>
        {renderingContent}
      </div>
    </>
  )
}

export default SideMenu;
