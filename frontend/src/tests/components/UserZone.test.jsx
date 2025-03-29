import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { dammyCurrentUser, renderWithProviders } from "../testUtils";
import UserZone from "../../components/general/sidemenu/UserZone";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

// UserInfo.jsxのテストも内包
describe('コンポーネント： UserZone.jsxのテスト', () => {
  beforeEach(() => {});

  afterEach(() => cleanup());

  test('初期表示: Userinfoがレンダリングされ、ログインユーザーの情報が表示される', async() => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <UserZone />
      </BrowserRouter>, {
        preloadedState: {
          currentUser: dammyCurrentUser(),
        }
    });
    const currentUser = dammyCurrentUser().user;
    expect(screen.getByRole('button'   , {name: 'edit-mode-btn'})).toBeInTheDocument();
    expect(screen.getByRole('user-info', {name: 'name'})         ).toHaveTextContent(currentUser.name);
    expect(screen.getByRole('user-info', {name: 'weight'})       ).toHaveTextContent(currentUser.weight);
    expect(screen.getByRole('user-info', {name: 'email'})        ).toBeInTheDocument();
    expect(screen.queryByRole('button' , {name: 'info-mode-btn'})).not.toBeInTheDocument();
    // UserEditFormに切り替え表示できる
    await user.click(screen.getByRole('button', {name: 'edit-mode-btn'}));
    expect(screen.getByRole('button'  , {name: 'info-mode-btn'})  ).toBeInTheDocument();
    expect(screen.getByRole('button'  , {name: 'user-update-btn'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'edit-mode-btn'})  ).not.toBeInTheDocument();
    expect(screen.getByLabelText('名前')  ).toBeInTheDocument();
    expect(screen.getByLabelText('体重')  ).toBeInTheDocument();
    expect(screen.getByLabelText('メール')).toBeInTheDocument();
    // userInfoに戻せる
    await user.click(screen.getByRole('button', {name: 'info-mode-btn'}));
    expect(screen.getByRole('button'  , {name: 'edit-mode-btn'})  ).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'info-mode-btn'})  ).not.toBeInTheDocument();
  });
});
