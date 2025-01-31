import { describe, expect, test } from "vitest";
import { isEmptyObj } from "../../utils/objectCtl";

describe('Unit: objectCtlのテスト', () => {
  test('isEmptyObj(obj): オブジェクトが空かどうか判定する', () => {
    const objEmp  = {};
    const objFull = {num: 1};

    expect(isEmptyObj(objEmp)).toBe(true);
    expect(isEmptyObj(objFull)).toBe(false);
  });
});
