import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../Redux/Slice/ThemeSlice";

function ThemeChangeBtn() {
  const theme = useSelector(state => state.theme.name);
  const dispatch = useDispatch();

  return(
    <>
      <div className="flex justify-center gap-4">
        <p>テーマ変更</p>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller"
            aria-label="theme-ctl-btn"
            checked={theme === "dark"}
            onChange={() => dispatch(changeTheme())} />
          <i role="theme-icon" aria-label="theme-icon-off" className="i-lucide-sun  swap-off h-6 w-6 fill-current" />
          <i role="theme-icon" aria-label="theme-icon-on"  className="i-lucide-moon swap-on  h-6 w-6 fill-current"/>
        </label>
      </div>
    </>
  )
}

export default ThemeChangeBtn;