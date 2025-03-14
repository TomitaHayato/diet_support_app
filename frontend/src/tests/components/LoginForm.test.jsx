import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {cleanup, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from "../../components/general/sidemenu/auth_form/LoginForm";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../Redux/store";
import { loginThunk } from "../../Redux/Slice/currentUserSlice";

describe('コンポーネント： LoginForm.jsxのテスト', () => {
  let dispatchMock

  beforeEach(() => {
    // useDispatchだけをMock化
    vi.mock('react-redux', async() => {
      const original = await vi.importActual('react-redux');
      return {
        ...original,
        useDispatch: vi.fn(),
      }
    });
    // ローカル変数dispatchに、MockuseDispatchからMock関数（dispatchMock）を渡す
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // loginThunkだけMock化
    vi.mock('../../Redux/Slice/currentUserSlice', async() => {
      const original = await vi.importActual('../../Redux/Slice/currentUserSlice');
      return {
        ...original,
        loginThunk: vi.fn(),
      }
    });
    
    vi.mock('../../utils/devTool', () => {
      return { putDev: vi.fn(), }
    })
  });

  afterEach(() => {
    cleanup();
  });

  test('ログインフォームが表示される', () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    // emailフォーム, passwordフォーム, 送信ボタン の有無
    expect(screen.getByRole('textbox', {name: 'login-email'}   )).toBeInTheDocument();
    expect(screen.getByRole('pass'   , {name: 'login-password'})).toBeInTheDocument();
    expect(screen.getByText('ログイン', {selector: 'input'}     )).toBeInTheDocument();
    // errorが初期表示されていない
    expect(screen.queryByRole('error')).not.toBeInTheDocument();
  });

  test('入力値が空の場合、バリデーションエラー', async() => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const submitBtn = screen.getByText('ログイン', {selector: 'input'});

    // 何も入力しないでログイン
    await user.click(submitBtn);
    // エラーメッセージがUIに表示
    const emailError    = screen.getByRole('error', {name: 'login-email-error'});
    const passwordError = screen.getByRole('error', {name: 'login-password-error'});
    expect(emailError).toHaveTextContent('メールアドレスを入力してください');
    expect(passwordError).toHaveTextContent('パスワードを入力してください');
  });

  test('正常に入力してログインボタンを押下 => hundleSubmitのコールバックが発火', async() => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const emailForm = screen.getByRole('textbox', {name: 'login-email'});
    const passForm  = screen.getByRole('pass'   , {name: 'login-password'});
    const submitBtn = screen.getByText('ログイン', {selector: 'input'});
    // フォームに入力値を入力
    await user.type(emailForm, 'email@ex.com');
    await user.type(passForm , 'password');
    expect(emailForm).toHaveValue('email@ex.com');
    await user.click(submitBtn);
    expect(screen.queryByRole('error')).not.toBeInTheDocument();
    // loginThunk(params)アクションがdispatchされる
    expect(useDispatch).toHaveBeenCalled();
    expect(loginThunk).toHaveBeenCalledWith({email: 'email@ex.com', password: 'password'})
    expect(dispatchMock).toHaveBeenCalledWith(loginThunk({email: 'email@ex.com', password: 'password'}));
  });

  test('ログイン処理が完了しない場合、エラー', async() => {
    // ログイン処理でエラー
    loginThunk.mockImplementation(() => {
      throw new Error;
    });

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const emailForm = screen.getByRole('textbox', {name: 'login-email'});
    const passForm  = screen.getByRole('pass'   , {name: 'login-password'});
    const submitBtn = screen.getByText('ログイン', {selector: 'input'});
    // フォームに入力値を入力
    await user.type(emailForm, 'email@ex.com');
    await user.type(passForm , 'password');
    await user.click(submitBtn);

    // エラーが発生する
    expect(screen.getByRole('error-message', {name: 'login-error'})).toHaveTextContent('ログインできませんでした。');
  });
});
