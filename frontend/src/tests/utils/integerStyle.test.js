import { describe, expect, test } from "vitest"
import { secondsToMMSS } from "../../utils/integerStyle";

describe('Unit: integerStyleのテスト', () => {
  test('secondsToMMSS(sec): 秒数をMMSS形式の文字列に変更', () => {
    const sec1 = 1; // 1秒
    const sec2 = 600; // 10分00秒
    const sec3 = 6010 // 100分10秒

    expect(secondsToMMSS(sec1)).toBe('01秒');
    expect(secondsToMMSS(sec2)).toBe('10分 00秒');
    expect(secondsToMMSS(sec3)).toBe('100分 10秒')
  });
});
