import { describe, expect, test } from "vitest";
import { nameSearch, tagFilter } from "../../utils/search";

describe('Unit: search.jsのテスト', () => {
  const soccer  = { name: 'サッカー'              , tagList: ['だれかと', 'アウトドア'] }
  const cycling = { name: 'サイクリング（20km/h）', tagList: ['ひとりで', 'アウトドア'] }
  const running = { name: 'ランニング'            , tagList: [] }

  const objArray = [soccer, cycling, running];

  test('nameSearch: nameの値でオブジェクトを検索できる', () => {
    const searchQuery2 = 'サ h'
    const searchQuery3 = ''

    // 空白で区切った場合、＆検索
    expect(nameSearch(objArray, searchQuery2)).not.toContain(soccer);
    expect(nameSearch(objArray, searchQuery2)).toContain(cycling);
    expect(nameSearch(objArray, searchQuery2)).not.toContain(running);
    // 空白で検索した場合、全て取得
    expect(nameSearch(objArray, searchQuery3)).toContain(soccer);
    expect(nameSearch(objArray, searchQuery3)).toContain(cycling);
    expect(nameSearch(objArray, searchQuery3)).toContain(running);
  });

  test('tagFilter: 指定した名前のtagがtagListに含まれるオブジェクトのみを返す', () => {
    const filterQuery1 = ['アウトドア', 'だれかと'];
    const filterQuery2 = [];

    // 指定したタグを全て持つ要素のみ取得
    expect(tagFilter(objArray, filterQuery1)).toContain(soccer);
    expect(tagFilter(objArray, filterQuery1)).not.toContain(cycling);
    expect(tagFilter(objArray, filterQuery1)).not.toContain(running);
    // 空配列を渡した場合、全て取得
    expect(tagFilter(objArray, filterQuery2)).toContain(soccer);
    expect(tagFilter(objArray, filterQuery2)).toContain(cycling);
    expect(tagFilter(objArray, filterQuery2)).toContain(running);
  });
})