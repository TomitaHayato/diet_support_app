import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import SideMenu from "../../components/general/sidemenu/SideMenu";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../Contexts/Contexts";

describe('コンポーネント: SideMenu.jsxのテスト', () => {
  describe('ログイン前', () => {
    beforeAll(() => {
      // テスト前に1度、SideMenuコンポーネントをレンダリング
      render(<SideMenu />);
    });

    test('テーマ切り替えボタンが表示される', () => {
      //画面表示
      const themeChangeBtn = screen.getByTestId('theme-change-btn');
      expect(themeChangeBtn).toBeInTheDocument();
    });

    test('ログインフォームが表示される', () => {
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByRole('passwordbox', {name: 'login-password'})).toBeInTheDocument();
      expect(screen.getByRole('button', {name: 'ログイン'})).toBeInTheDocument();
    });

    test('新規登録フォームのモーダルが表示される', async() => {
      expect(screen.getByText('アカウント未登録の方はこちら'));
      const signupBtn = screen.getByRole('button', {name: 'アカウント新規作成'});
      expect(signupBtn).toBeInTheDocument();

      // モーダルが表示されるかを確認
      const user = userEvent.setup();

      await user.click(signupBtn);

      expect(screen.getByRole('dialog'     , {name: 'signup-form-modal'}           )).toBeInTheDocument();
      expect(screen.getByRole('textbox'    , {name: 'signup-name'}                 )).toBeInTheDocument();
      expect(screen.getByRole('textbox'    , {name: 'signup-email'}                )).toBeInTheDocument();
      expect(screen.getByRole('passwordbox', {name: 'signup-password'}             )).toBeInTheDocument();
      expect(screen.getByRole('passwordbox', {name: 'signup-password-confirmation'})).toBeInTheDocument();
    });
  });

  describe('ログイン後', () => {
    // ログインユーザを設定して、コンポーネントをレンダリング
    // beforeAll(() => {
    //   const currentUserTest = {
    //     name: 'user',
    //     weight: 50,
    //     email: 'test@test.com',
    //   }

    //   render(
    //     <AuthContext.Provider value={{currentUser: currentUserTest}}>
    //       <SideMenu />
    //     </AuthContext.Provider>
    //   );
    // });

    // 今日のデータ
    test('今日のデータが表示される', () => {});
    // 期間ごとのデータ
    test('期間ごとのデータが表示される', () => {});
    // プロフィール
    test('プロフィールが表示される', () => {});
    // プロフィール編集
    test('プロフィール編集フォームを表示可能', () => {});
    // ログアウト
    test('ログアウトボタンが表示される', () => {});
  })
});