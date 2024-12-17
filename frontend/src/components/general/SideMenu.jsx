import LoginForm from "./LoginForm";

function SideMenu() {
  return (
    <>
      <div className=''>
        {/* ログインフォーム */}
        <div>
          <p>ログイン</p>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default SideMenu;