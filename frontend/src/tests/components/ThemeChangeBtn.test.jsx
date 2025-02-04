import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SideMenuContext } from "../../Contexts/Contexts";
import SideMenu from "../../components/general/sidemenu/SideMenu";

describe('コンポーネント: ThemeChangeBtnのテスト', () => {
  test('theme切り替えボタンが表示', () => {
    // themeステートのMock
    let   themeMock    = 'dark';
    const setThemeMock = vi.fn(() => themeMock = themeMock === 'dark' ? 'retro' : 'dark');
    expect(themeMock).toBe('dark');
    expect(setThemeMock).toHaveBeenCalledTimes(0);

    render(
      <SideMenuContext.Provider value={{theme: themeMock, setTheme: setThemeMock}}>
        <SideMenu />
      </SideMenuContext.Provider>
    );

    //画面表示
    const themeChangeBtn = screen.getByTestId('theme-change-btn');
    expect(themeChangeBtn).toBeInTheDocument();

    // ボタンを押下 => テーマ切り替え
    fireEvent.click(themeChangeBtn);
    expect(setThemeMock).toHaveBeenCalledTimes(1)
    expect(themeMock).toBe('retro');

    fireEvent.click(themeChangeBtn);
    expect(setThemeMock).toHaveBeenCalledTimes(2)
    expect(themeMock).toBe('dark');
  });
});