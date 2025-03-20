import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { renderWithProviders } from "../testUtils";
import TodayData from "../../components/general/sidemenu/TodayData";

describe('コンポーネント: TodayData.jsxのテスト', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    cleanup();
  });

  test('todayDataが正常に表示される', () => {
    renderWithProviders(<TodayData />, {
      preloadedState: {
        workoutRecords: {
            todayData: {
            totalTime: 0,
            totalBurnedCalories: 0,
            totalIntakedCalories: 0,
          },
          weeklyData:  [],
          monthlyData: [],
          yearlyData:  [],
          status:     'successed',
          error:       null,
        }
      }
    });
    expect(screen.getByRole('today-data', {name: 'totalTime'})).toBeInTheDocument();
    expect(screen.getByRole('today-data', {name: 'totalTime'})).toHaveTextContent('00');
    expect(screen.getByRole('today-data', {name: 'totalBurnedCalories'})).toBeInTheDocument();
    expect(screen.getByRole('today-data', {name: 'totalBurnedCalories'})).toHaveTextContent('0');
    expect(screen.getByRole('today-data', {name: 'totalIntakedCalories'})).toBeInTheDocument();
    expect(screen.getByRole('today-data', {name: 'totalIntakedCalories'})).toHaveTextContent('0');
  });
})