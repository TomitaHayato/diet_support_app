import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import SideMenu from "../../components/general/sidemenu/SideMenu";
import { dammyCurrentUser, renderWithProviders } from "../testUtils";

describe('コンポーネント: SideMenu.jsxのテスト', () => {
  // 子コンポーネントのMock化
  beforeEach(() => {
    vi.mock('../../components/general/sidemenu/ThemeChangeBtn', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>ThemeChangeBtn</p>)
      }
    });
    vi.mock('../../components/general/sidemenu/LoggedInContents', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>LoggedInContents</p>)
      }
    });
    vi.mock('../../components/general/sidemenu/BeforeLoginContents', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>BeforeLoginContents</p>)
      }
    });
  })

  afterEach(() => {
    cleanup();
  })
  
  test('ログイン前: BeforeLoginContentsが表示される', () => {
    renderWithProviders(<SideMenu />);
    expect(screen.getByText('ThemeChangeBtn')).toBeInTheDocument();
    expect(screen.getByText('BeforeLoginContents')).toBeInTheDocument();
    expect(screen.queryByText('LoggedInContents')).not.toBeInTheDocument();
  })

  test('ログイン後のコンテンツが表示される', () => {
    // storeにcurrentUserをセットして、コンポーネントをレンダリング
    renderWithProviders(<SideMenu />, {
      preloadedState: { currentUser: dammyCurrentUser(), }
    });
    expect(screen.getByText('ThemeChangeBtn')).toBeInTheDocument();
    expect(screen.getByText('LoggedInContents')).toBeInTheDocument();
    expect(screen.queryByText('BeforeLoginContents')).not.toBeInTheDocument();
  })
});
