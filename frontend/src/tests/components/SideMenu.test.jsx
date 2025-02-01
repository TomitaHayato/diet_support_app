import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SideMenu from "../../components/general/sidemenu/SideMenu";

describe('コンポーネント: SideMenu.jsxのテスト', () => {

  describe('ログイン前', () => {
    // テーマ切り替えボタン
    test('theme切り替えボタンが表示', () => {
      render(<SideMenu />);

      //画面表示
      const themeChangeBtn = screen.getByTestId('theme-change-btn');
      expect(themeChangeBtn).toBeInTheDocument();
    });
    // ログインフォーム
    // 新規登録フォーム
  });

  describe('ログイン後', () => {
    // 今日のデータ
    test('今日のデータが表示される', () => {});
    // 期間ごとのデータ
    // プロフィール
    // プロフィール編集
    // ログアウト
  })
});