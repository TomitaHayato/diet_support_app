import { useTheme } from "../../../Contexts/ThemeContext";

function ThemeChangeBtn() {
  const {theme, setTheme} = useTheme();

  return(
    <>
      <div className="flex justify-center gap-4">
        <p>テーマ変更</p>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" data-testid="theme-change-btn"
            checked={theme === "dark"} aria-label="theme-control-btn"
            onChange={() => setTheme(theme === "retro" ? "dark" : "retro")} />
          <i className="i-lucide-sun  swap-off h-6 w-6 fill-current" />
          <i className="i-lucide-moon swap-on  h-6 w-6 fill-current"/>
        </label>
      </div>
    </>
  )
}

export default ThemeChangeBtn;