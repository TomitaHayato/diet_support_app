import { cleanup, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { signupThunk } from "../../Redux/Slice/currentUserSlice";
import userEvent from "@testing-library/user-event";
import { store } from "../../Redux/store";
import SignupModal from "../../components/general/sidemenu/auth_form/SignupModal";

describe('コンポーネント： SignupModal.jsxのテスト', () => {
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
        signupThunk: vi.fn(),
      }
    })
  });

  afterEach(() => {
    cleanup();
  });

  test('初期表示＋ボタンクリックでモーダルが表示', async() => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SignupModal />
      </Provider>
    );
    // 初期表示
    const modalOpenBtn = screen.getByRole('button', {name: 'signup-modal-open-button'});
    expect(screen.getByText('アカウント未登録の方はこちら')).toBeInTheDocument();
    expect(modalOpenBtn).toBeInTheDocument();
    // モーダルは表示されていない
    expect(screen.queryByRole('modalbox', {name: 'signup-modalbox'})).not.toBeInTheDocument();

    await user.click(modalOpenBtn);
    // Signupモーダルが表示される
    expect(screen.getByRole('modalbox', {name: 'signup-modalbox'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'signup-name'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'signup-email'})).toBeInTheDocument();
    expect(screen.getByRole('passwordbox', {name: 'signup-password'})).toBeInTheDocument();
    expect(screen.getByRole('passwordbox', {name: 'signup-password-confirmation'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'signup-submit'})).toBeInTheDocument();
  });

  test('正常値が入力された場合、signup()が呼び出される => setCurrentUser(), settingAuthTokenToCookie()が実行される', async() => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SignupModal />
      </Provider>
    );
    await user.click(screen.getByRole('button', {name: 'signup-modal-open-button'}));
    // 入力
    const nameForm = screen.getByRole('textbox', {name: 'signup-name'});
    const emailForm = screen.getByRole('textbox', {name: 'signup-email'});
    const passwordForm = screen.getByRole('passwordbox', {name: 'signup-password'});
    const passwordConfirmForm = screen.getByRole('passwordbox', {name: 'signup-password-confirmation'});
    
    const formParams = {
      name: 'name',
      email: 'email@ex.com',
      password: '123456',
      passwordConfirmation: '123456',
    }
    await user.type(nameForm, formParams.name);
    await user.type(emailForm, formParams.email);
    await user.type(passwordForm, formParams.password);
    await user.type(passwordConfirmForm, formParams.passwordConfirmation);
    await user.click(screen.getByRole('checkbox', {name: 'policy-agree'}));
    await user.click(screen.getByRole('button', {name: 'signup-submit'}));
    // Mockが呼び出される
    expect(dispatchMock).toHaveBeenCalledWith(signupThunk(formParams));
  });

  test('不正な入力値を入力した場合、errorにエラーメッセージが格納', async() => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SignupModal />
      </Provider>
    );
    await user.click(screen.getByRole('button', {name: 'signup-modal-open-button'}));
    // 入力
    const passwordForm = screen.getByRole('passwordbox', {name: 'signup-password'});
    const passwordConfirmForm = screen.getByRole('passwordbox', {name: 'signup-password-confirmation'});
    
    const formParams = {
      password: '12345',
      passwordConfirmation: '12345',
    }
    await user.type(passwordForm, formParams.password);
    await user.type(passwordConfirmForm, formParams.passwordConfirmation);
    await user.click(screen.getByRole('checkbox', {name: 'policy-agree'}));
    await user.click(screen.getByRole('button', {name: 'signup-submit'}));
    // バイデーションエラー
    expect(dispatchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('error', {name: 'signup-name-error'})).toHaveTextContent('名前を入力してください');
    expect(screen.getByRole('error', {name: 'signup-email-error'})).toHaveTextContent('メールアドレスを入力してください');
    expect(screen.getByRole('error', {name: 'signup-password-error'})).toHaveTextContent('6文字以上必要です');
    expect(screen.getByRole('error', {name: 'signup-password-confirmation-error'})).toHaveTextContent('6文字以上必要です');
  });

  test('登録処理でエラーが発生した場合: ', async() => {
    signupThunk.mockImplementation(() => {
      throw new Error;
    });

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SignupModal />
      </Provider>
    );
    await user.click(screen.getByRole('button', {name: 'signup-modal-open-button'}));
    // 入力
    const nameForm = screen.getByRole('textbox', {name: 'signup-name'});
    const emailForm = screen.getByRole('textbox', {name: 'signup-email'});
    const passwordForm = screen.getByRole('passwordbox', {name: 'signup-password'});
    const passwordConfirmForm = screen.getByRole('passwordbox', {name: 'signup-password-confirmation'});
    
    const formParams = {
      name: 'name',
      email: 'email@ex.com',
      password: '123456',
      passwordConfirmation: '123456',
    }
    await user.type(nameForm, formParams.name);
    await user.type(emailForm, formParams.email);
    await user.type(passwordForm, formParams.password);
    await user.type(passwordConfirmForm, formParams.passwordConfirmation);
    await user.click(screen.getByRole('checkbox', {name: 'policy-agree'}));
    await user.click(screen.getByRole('button', {name: 'signup-submit'}));
    // エラーが表示
    expect(dispatchMock).not.toHaveBeenCalled();
    expect(screen.getByRole('error-message', {name: 'signup-error'})).toHaveTextContent('新規登録に失敗しました');
  });
});
