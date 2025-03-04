import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch } from "react-redux";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { store } from "../../Redux/store";
import LogoutForm from "../../components/general/sidemenu/auth_form/LogoutForm";
import { logoutThunk } from "../../Redux/Slice/currentUserSlice";

describe('コンポーネント： LogoutForm.jsxのテスト', () => {
  let dispatchMock

  beforeEach(() => {
    vi.mock('react-redux', async() => {
      const original = await vi.importActual('react-redux');
      return {
        ...original,
        useDispatch: vi.fn(),
      }
    })
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);

    vi.mock('../../Redux/Slice/currentUserSlice', async() => {
      const original = await vi.importActual('../../Redux/Slice/currentUserSlice');
      return {
        ...original,
        logoutThunk: vi.fn(),
      }
    })
  });

  afterEach(() => {
    cleanup();
  });

  test('要素が正常に表示される', () => {
    render(
      <Provider store={store}>
        <LogoutForm />
      </Provider>
    );
    const logoutBtn = screen.getByRole('button', {name: 'logout-button'});
    expect(logoutBtn).toBeInTheDocument();
    expect(screen.queryByRole('error-message')).not.toBeInTheDocument();
  });

  test('ログアウトボタンを押下 => ログアウト処理が実行', async() => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <LogoutForm />
      </Provider>
    );
    const logoutBtn = screen.getByRole('button', {name: 'logout-button'});
    await user.click(logoutBtn);
    expect(dispatchMock).toHaveBeenCalledWith(logoutThunk());
  });

  test('ログアウト処理でエラー => エラー文がUIに表示', async() => {
    logoutThunk.mockImplementation(() => {
      throw new Error;
    });

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <LogoutForm />
      </Provider>
    );
    const logoutBtn = screen.getByRole('button', {name: 'logout-button'});
    await user.click(logoutBtn);
    expect(screen.getByRole('error-message')).toHaveTextContent('ログアウトに失敗しました');
  });
});
