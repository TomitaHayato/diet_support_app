import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";

describe('コンポーネント： RadioBtnXs.jsxのテスト', () => {
  beforeEach(() => {
    // propsから渡される親のステートをMock化
  });

  afterEach(() => cleanup());

  test('propsに渡されたnameが想定されたタグ名でない場合、何も返さない', async() => {});
  test('要素が表示される', async() => {
    // 選択肢を用意
    // 
    // 選択肢ごとのラジオボタンが表示
    // タグの説明が表示
    // selectedOptionsに含まれている選択肢のラジオボタンだけがcheckされている
  });
});
