import LoginForm from "./LoginForm";

function SideMenu() {
  return (
    <>
      <div className=''>
        {/* ログインフォーム */}
        <div>
          <p className="text-xl text-center font-semibold mb-3">ログイン</p>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default SideMenu;