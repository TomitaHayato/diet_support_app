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
          <input type="checkbox" className="theme-controller" data-testid="theme-change-btn"
            checked={theme === "dark"} aria-label="theme-control-btn"
            onChange={() => dispatch(changeTheme())} />
          <i className="i-lucide-sun  swap-off h-6 w-6 fill-current" />
          <i className="i-lucide-moon swap-on  h-6 w-6 fill-current"/>
        </label>
      </div>
    </>
  )
}

export default ThemeChangeBtn;