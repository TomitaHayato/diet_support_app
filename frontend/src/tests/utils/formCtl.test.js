import { describe, expect, test } from "vitest";
import { btnOff, btnOn, resetInput } from "../../utils/formCtl";

describe('Unit: formCtlのテスト', () => {
  test('resetInput: input要素のvalueを空文字にする', () => {
    const inputEl = document.createElement('input');
    const textDef = 'test';
    inputEl.value = textDef;
    // 初期状態
    expect(inputEl.value).toBe(textDef);
    resetInput(inputEl);
    //処理後
    expect(inputEl.value).toBe('');
  });

  test('btnOff: button要素のdisabled属性をtrueにする', () => {
    const btn = document.createElement('button');
    btn.disabled = false;
    // 初期状態
    expect(btn.disabled).toBe(false);
    btnOff(btn);
    // 操作後
    expect(btn.disabled).toBe(true);
  });
  
  test('btnOn: button要素のdisabled属性をfalseにする', () => {
    const btn = document.createElement('button');
    btn.disabled = true;
    // 初期状態
    expect(btn.disabled).toBe(true);
    btnOn(btn);
    // 操作後
    expect(btn.disabled).toBe(false);
  });
});
