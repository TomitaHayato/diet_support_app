import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import SideMenu from "../../components/general/sidemenu/SideMenu";
import { store } from "../../Redux/store";
import { Provider } from "react-redux";

describe('コンポーネント: SideMenu.jsxのテスト', () => {

  // 子コンポーネントのMock化
  beforeEach(() => {
  })

  afterEach(() => {
    cleanup();
  })
  
  test('ログイン前: BeforeLoginContentsが表示される', () => {
    render(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );
  })

  test('ログイン後のコンテンツが表示される', () => {
    render(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );
  })
});
