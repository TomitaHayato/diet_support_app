import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import SideMenu from "../../components/general/sidemenu/SideMenu";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/store";
import { changeTheme } from "../../Redux/Slice/ThemeSlice";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe('コンポーネント: ThemeChangeBtnのテスト', () => {
  let dispatchMock
  let theme = "retro"

  beforeEach(() => {
    // useDispatch, useSelectorのMockを作成
    vi.mock('react-redux', async() => {
      const original = await vi.importActual('react-redux');
      return {
        ...original,
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
      }
    })
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue(theme);
    // changeThemeのMock
    vi.mock('../../Redux/Slice/ThemeSlice', async() => {
      const original = await vi.importActual('../../Redux/Slice/ThemeSlice')
      return {
        ...original,
        changeTheme: vi.fn(),
      }
    })
  });

  afterEach(() => {
    cleanup();
  })

  test('theme切り替えボタンが表示', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SideMenu />
        </Provider>
      </BrowserRouter>
      
    );
    // 初期表示
    expect(screen.getByRole('theme-icon', {name: 'theme-icon-off'})).toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: 'theme-ctl-btn'})).toBeInTheDocument();
  });

  test('Themeを切り替えできる', async() => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SideMenu />
        </Provider>
      </BrowserRouter>
    );
    const themeCtlBtn = screen.getByRole('checkbox', {name: 'theme-ctl-btn'});
    await user.click(themeCtlBtn);
    expect(dispatchMock).toHaveBeenCalledWith(changeTheme());
  });
});