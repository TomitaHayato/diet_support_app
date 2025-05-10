import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../Redux/Slice/currentUserSlice";
import { useNavigate } from "react-router";

function FooterMenu() {
  const currentUser = useSelector(selectCurrentUser);
  const navi = useNavigate();

  return(
    <>
      <div className="btm-nav h-[4.5rem] z-40">
        <button onClick={() => navi('/top')}>
          <i className="i-lucide-home"/>
          <span className="btm-nav-label">Home</span>
        </button>

        <div className="tooltip flex" data-tip={currentUser ? null : 'ログインが必要です'}>
          <button className="active" onClick={() => {
            currentUser && navi(`/profile`);
          }}>
            <i className="i-lucide-user"/><br />
            <span className="btm-nav-label">User</span>
          </button>
        </div>

        <div className="tooltip flex" data-tip={currentUser ? null : 'ログインが必要です'}>
          <button onClick={() => {
            currentUser && navi('/records')
          }}>
            <i className="i-lucide-chart-column"/><br />
            <span className="btm-nav-label">Charts</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default FooterMenu;
