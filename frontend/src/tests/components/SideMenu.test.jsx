import { cleanup, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import SideMenu from "../../components/general/sidemenu/SideMenu";
import { AuthContext } from "../../Contexts/Contexts";

describe('コンポーネント: SideMenu.jsxのテスト', () => {

  // 子コンポーネントのMock化
  beforeAll(() => {
    vi.mock('../../components/general/sidemenu/LoggedInContents', () => {
      return {
        default: () => <div>ログイン後</div>,
      }
    });

    vi.mock('../../components/general/sidemenu/beforeLoginContents', () => {
      return {
        default: () => <div>ログイン前</div>,
      }
    });
  });
  
  test('ログイン前: BeforeLoginContentsが表示される', () => {
    render(
      <AuthContext.Provider value={{currentUser: false}}>
        <SideMenu />
      </AuthContext.Provider>
    );

    expect(screen.getByText('ログイン前')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: 'theme-control-btn'})).toBeInTheDocument();

    cleanup();
  })

  test('ログイン後のコンテンツが表示される', () => {
    render(
      <AuthContext.Provider value={{currentUser: true}}>
        <SideMenu />
      </AuthContext.Provider>
    );

    expect(screen.getByText('ログイン後')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', {name: 'theme-control-btn'})).toBeInTheDocument();

    cleanup();
  })
});

  // TODO: これらのテストをAuthForm.jsxのテストに移動
  // test('ログインフォームが表示される', () => {
  //   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  //   expect(screen.getByRole('passwordbox', {name: 'login-password'})).toBeInTheDocument();
  //   expect(screen.getByRole('button', {name: 'ログイン'})).toBeInTheDocument();
  // });
  // test('新規登録フォームのモーダルが表示される', async() => {
  //   expect(screen.getByText('アカウント未登録の方はこちら'));
  //   const signupBtn = screen.getByRole('button', {name: 'アカウント新規作成'});
  //   expect(signupBtn).toBeInTheDocument();

  //   // モーダルが表示されるかを確認
  //   const user = userEvent.setup();

  //   await user.click(signupBtn);

  //   expect(screen.getByRole('dialog'     , {name: 'signup-form-modal'}           )).toBeInTheDocument();
  //   expect(screen.getByRole('textbox'    , {name: 'signup-name'}                 )).toBeInTheDocument();
  //   expect(screen.getByRole('textbox'    , {name: 'signup-email'}                )).toBeInTheDocument();
  //   expect(screen.getByRole('passwordbox', {name: 'signup-password'}             )).toBeInTheDocument();
  //   expect(screen.getByRole('passwordbox', {name: 'signup-password-confirmation'})).toBeInTheDocument();
  // });
