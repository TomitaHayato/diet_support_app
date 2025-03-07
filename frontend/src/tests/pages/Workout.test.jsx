import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";

describe('コンポーネント: Workout.jsx', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    cleanup();
  });

  test('初期表示', () => {
    // TODO useLocationから値を受け取る処理をテストで再現する方法
    // TODO reactRouterを使用した場合のテスト方法
    // renderWithProviders(<Workout />);

    // WorkoutCount, WorkoutFormがレンダリングされている
    // workout.nameが表示される
  });

  test('Topページに遷移できる', async() => {});

  test('', async() => {});

  test('', async() => {});

  test('', async() => {});
});