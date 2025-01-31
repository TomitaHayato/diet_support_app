import { describe, expect, test } from "vitest";
import { defaultMonthlyData, defaultTodayData, defaultWeeklyData, defaultYearlyData, dowIndex } from "../../utils/defaultRecordData";

describe('defaultRecordDataのテスト', () => {
  test('dowIndex', () => {
    expect(dowIndex['日']).toBe(0);
    expect(dowIndex['月']).toBe(1);
    expect(dowIndex['火']).toBe(2);
    expect(dowIndex['水']).toBe(3);
    expect(dowIndex['木']).toBe(4);
    expect(dowIndex['金']).toBe(5);
    expect(dowIndex['土']).toBe(6);
  });

  test('defaultWeeklyData', () => {
    const week = ["日", "月", "火", "水", "木", "金", "土"];
    // 配列の長さ
    expect(defaultWeeklyData.length).toBe(7);
    // 配列の内容
    [0, 3, 6].forEach((dow_i) => {
      const data = defaultWeeklyData[dow_i];
      expect(data.dow).toBe(week[dow_i]);
      expect(data.totalTime).toBe(0);
      expect(data.totalBurnedCalories).toBe(0);
      expect(data.totalUnburnedCalories).toBe(0);
      expect(data.totalIntakedCalories).toBe(0);
    });
  })

  test('defaultMonthlyData', () => {
    const now      = new Date;
    const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 今月末の日にち

    // 配列の長さ
    expect(defaultMonthlyData.length).toBe(lastDate.getDate());
    // 配列の内容
    [0, 14, lastDate.getDate() - 1].forEach((index) => {
      const data = defaultMonthlyData[index];
      expect(data.date).toBe(index + 1);
      expect(data.totalTime).toBe(0);
      expect(data.totalBurnedCalories).toBe(0);
      expect(data.totalUnburnedCalories).toBe(0);
      expect(data.totalIntakedCalories).toBe(0);
    });
  })

  test('defaultYearlyData', () => {
    // 長さ
    expect(defaultYearlyData.length).toBe(12);
    // 内容
    [0, 6, 11].forEach((index) => {
      const data = defaultYearlyData[index];
      expect(data.month).toBe(index + 1);
      expect(data.totalTime).toBe(0);
      expect(data.totalBurnedCalories).toBe(0);
      expect(data.totalUnburnedCalories).toBe(0);
      expect(data.totalIntakedCalories).toBe(0);
    });
  })

  test('defaultTodayData', () => {
    // 内容
    expect(defaultTodayData.totalTime).toBe(0);
    expect(defaultTodayData.totalBurnedCalories).toBe(0);
    expect(defaultTodayData.totalUnburnedCalories).toBe(0);
    expect(defaultTodayData.totalIntakedCalories).toBe(0);
  });
});