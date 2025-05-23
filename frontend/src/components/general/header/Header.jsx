import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/Slice/currentUserSlice";
import LogoutBtn from "./LogoutBtn";
import LoginBtn from "./LoginBtn";
import ThemeChangeBtn from "../sidemenu/ThemeChangeBtn";
import HowToUse from "./HowtoUse";
import { useLocation, useNavigate } from "react-router-dom";
import { selectTheme } from "../../../Redux/Slice/ThemeSlice";
import { bgColor } from "../../../utils/style";

function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);
  const location = useLocation();
  const navi     = useNavigate();

  function hundleClick(){
    document.getElementById('how-to-use-content').showModal();
  }

  function hundleClickLogo() {
    if(location.pathname === '/top' || location.pathname === '/') return;
    navi('/top');
  }

  return (
    <>
      <div data-testid="app-intro" className="grid grid-cols-8 px-3 py-2 bg-base-100 border border-base-200 rounded-lg w-full">
        <span className="order-1">
          <button className="active:scale-95" onClick={hundleClickLogo}>
            <div className="avatar">
              <div className="max-w-8 md:max-w-12 rounded-xl">
                <img src="/icon.png" />
              </div>
            </div>
          </button>

        </span>

        {/* mobileコンテンツ */}
        <span className="lg:hidden col-span-2 order-2"></span>

        <div className="lg:hidden col-span-5 order-4 flex justify-center gap-4">
          <div className="lg:hidden flex items-center justify-end">
            <ThemeChangeBtn />
          </div>

          {/* ログイン案内 */}
          {currentUser ? <LogoutBtn /> : <LoginBtn />}

          <button className="btn btn-sm btn-outline btn-info" onClick={hundleClick}>使い方</button>
        </div>

        {/* PCコンテンツ */}
        <div className="col-span-6 order-2 text-center my-auto justify-items-stretch hidden lg:block">
          <p className="text-[0.65rem] lg:text-base">
            カロリーを消費するのに必要な運動時間を計算できます！</p>
          <p className="text-[0.5rem] lg:text-xs pt-1">
            参考： 厚生労働省「健康づくりのための身体活動・運動ガイド2023」
          </p>
        </div>

        <span className="order-8 hidden lg:block">
          <button className="btn btn-outline btn-info" onClick={hundleClick}>使い方</button>
        </span>

        {/* 使い方モーダル */}
        <dialog id="how-to-use-content" className="modal">
          <div className={`modal-box text-sm w-3/4 h-3/4 ${bgColor(theme)}`}>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-ghost absolute right-2 top-2">
                <i className="i-uiw-close text-red-500 font-bold"/>
              </button>
            </form>
            <HowToUse />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  )
}

export default Header;
