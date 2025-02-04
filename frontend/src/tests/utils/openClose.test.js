import { beforeEach, describe, expect, test } from "vitest";
import { closeEl, openAndCloseEl, openEl } from "../../utils/openClose";

describe('Unit: openCloseのテスト', () => {
  const displayEl = document.createElement('button');
  const hiddenEl  = document.createElement('button');

  beforeEach(() => {
    displayEl.classList.remove("hidden");
    hiddenEl.classList.add("hidden");
  });

  test('このdescribeブロックにおける初期状態の確認', () => {
    expect(displayEl.classList).not.toContain('hidden');
    expect(hiddenEl.classList).toContain('hidden');
  });

  test('openEl: 要素のクラスから"hidden"を削除する', () => {
    openEl(displayEl);
    openEl(hiddenEl);

    expect(displayEl.classList).not.toContain('hidden');
    expect(hiddenEl.classList).not.toContain('hidden');
  });

  test('closeEl: 要素のクラスにhiddenを追加する', () => {
    closeEl(displayEl);
    closeEl(hiddenEl);

    expect(displayEl.classList).toContain('hidden');
    expect(hiddenEl.classList).toContain('hidden');
  });

  test('openAndCloseEl: 要素のクラスにhiddenを追加または削除する', () => {
    openAndCloseEl(displayEl);
    openAndCloseEl(hiddenEl);

    expect(displayEl.classList).toContain('hidden');
    expect(hiddenEl.classList).not.toContain('hidden');
  });
});