import { cleanup, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { createWorkoutRecordThunk } from "../../../Redux/Slice/workoutRecordsSlice";
import { dammyCurrentUser, dammyIntakedCalorie, dammyWorkout, renderWithProviders } from "../../testUtils";
import WorkoutCount from "../../../components/workout/WorkoutCount";
import userEvent from "@testing-library/user-event";

describe('コンポーネント： WorkoutCount.jsxのテスト', () => {
  let dispatchMock
  const intakedCalorie = dammyIntakedCalorie(100);

  beforeEach(() => {
    vi.mock('react-redux', async() => {
      const original = await vi.importActual('react-redux');
      return {
        ...original,
        useDispatch: vi.fn(),
      }
    });
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
    vi.mock('../../../Redux/Slice/workoutRecordsSlice', async() => {
      const original = await vi.importActual('../../../Redux/Slice/workoutRecordsSlice');
      return {
        ...original,
        createWorkoutRecordThunk: vi.fn(),
      }
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('初期表示', () => {
    const workout = dammyWorkout();
    renderWithProviders(<WorkoutCount workout={workout}/>, {
      preloadedState: {
        intakedCalorie,
      }
    });
    // 残りkcal, 消費kcal, 目標時間, カウント, スタートボタン, 記録保存ボタンが表示される
    expect(screen.getByRole('kcal', {name: 'burned'})  ).toHaveTextContent('0');
    expect(screen.getByRole('kcal', {name: 'unburned'})).toHaveTextContent(`${intakedCalorie.value}`);
    expect(screen.getByRole('time', {name: 'target'})  ).toHaveTextContent(`${workout.requiredExerciseTime}分`);
    expect(screen.getByRole('time', {name: 'count'})   ).toHaveTextContent('00秒');
    expect(screen.getByRole('button', {name: 'start-stop'})   ).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'record-submit'})).toBeInTheDocument();
    // 運動記録を保存がクリックできない
    expect(screen.getByRole('button', {name: 'record-submit'})).toBeDisabled();
  });

  test('スタートボタンを押下', async() => {
    const workout = dammyWorkout();
    const user = userEvent.setup();
    renderWithProviders(<WorkoutCount workout={workout}/>, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
        intakedCalorie,
      }
    });
    // TODO: タイマーのMock
    const startBtn = screen.getByRole('button', {name: 'start-stop'});
    await user.click(startBtn);
    // 10秒経過後
    // ボタンの表記がストップ
    expect(startBtn).toHaveTextContent('ストップ')
    // カウントが10になる
    // 消費kcalが0でない
    // 残りkcal = intakedCalorie - 消費kcalになる
    // ストップを押下
    await user.click(startBtn);
    expect(startBtn).toHaveTextContent('スタート');
    // 2秒経過後
    // カウントが変化しない
  });

  test('記録を保存を押下 -> createWorkoutRecordThunkがdispatchされる', async() => {
    const workout = dammyWorkout();
    const user = userEvent.setup();
    renderWithProviders(<WorkoutCount workout={workout}/>, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
        intakedCalorie,
      }
    });
    const startBtn = screen.getByRole('button', {name: 'start-stop'});
    //スタートボタンを押す
    await user.click(startBtn);
    // 2秒経過
    await user.click(startBtn);
    await user.click(screen.getByRole('button', {name: 'record-submit'}));
    // createWorkoutRecordThunkがdispatchされる
    expect(dispatchMock).toHaveBeenCalledWith(createWorkoutRecordThunk());
    // カウントが0になる
    expect(screen.getByRole('time', {name: 'count'})).toHaveTextContent('00秒');
    // kcalの表示が0になる
    expect(screen.getByRole('kcal', {name: 'burned'})  ).toHaveTextContent('0');
    expect(screen.getByRole('kcal', {name: 'unburned'})).toHaveTextContent('0');
  });
});
