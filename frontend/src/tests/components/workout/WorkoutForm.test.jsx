import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { dammyCurrentUser, dammyIntakedCalorie, dammyWorkout, renderWithProviders } from "../../testUtils";
import WorkoutForm from "../../../components/workout/WorkoutForm";
import { createWorkoutRecordThunk } from "../../../Redux/Slice/workoutRecordsSlice";
import { useDispatch } from "react-redux";
import Big from "big.js";

describe('コンポーネント： WorkoutForm.jsxのテスト', () => {
  const intakedCalorie = 100
  let dispatchMock

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
    })
  });

  afterEach(() => {
    cleanup();
  })
  
  test('初期表示', () => {
    const workout = dammyWorkout();
    renderWithProviders(<WorkoutForm workout={workout} />, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
        intakedCalorie: dammyIntakedCalorie(intakedCalorie),
      }
    });

    expect(screen.getByRole('kcal', {name: 'intaked'})).toHaveTextContent(`${intakedCalorie}`);
    expect(screen.getByRole('kcal', {name: 'burned'})).toHaveTextContent('0');
    expect(screen.getByRole('kcal', {name: 'unburned'})).toHaveTextContent('0');
    expect(screen.getByRole('spinbutton', {name: 'workout-minute'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'workout-form-submit'})).toBeInTheDocument();
    expect(screen.getByText('以下のデータを保存します')).toBeInTheDocument();
  });

  test('Minuteを入力 => 値が変化', async() => {
    const user = userEvent.setup();
    const workout = dammyWorkout(1);
    renderWithProviders(<WorkoutForm workout={workout} />, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
        intakedCalorie: dammyIntakedCalorie(100),
      }
    });
    const minuteForm = screen.getByRole('spinbutton', {name: 'workout-minute'})
    expect(screen.getByRole('kcal', {name: 'intaked'})).toHaveTextContent(`${intakedCalorie}`);
    expect(screen.getByRole('kcal', {name: 'burned'})).toHaveTextContent('0');
    expect(screen.getByRole('kcal', {name: 'unburned'})).toHaveTextContent('0');
    // フォームに入力
    const minutes = 10
    const burnedKcal = new Big(workout.burnedKcalPerMin).times(minutes).round().toNumber();
    await user.type(minuteForm, `${minutes}`);
    expect(screen.getByRole('kcal', {name: 'burned'})).toHaveTextContent(`${burnedKcal}`)
    expect(screen.getByRole('kcal', {name: 'unburned'})).toHaveTextContent(`${intakedCalorie - burnedKcal}`)
  });

  test('フォームを送信 => ', async() => {
    const user = userEvent.setup();
    const workout = dammyWorkout(1);
    renderWithProviders(<WorkoutForm workout={workout} />, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
        intakedCalorie: dammyIntakedCalorie(100),
      }
    });
    // フォームに入力
    const minuteForm = screen.getByRole('spinbutton', {name: 'workout-minute'});
    const minutes = 10
    const burnedKcal = new Big(workout.burnedKcalPerMin).times(minutes).round().toNumber();
    await user.type(minuteForm, `${minutes}`);
    // 送信
    const submitBtn = screen.getByRole('button', {name: 'workout-form-submit'});
    await user.click(submitBtn);
    const expectedParams = {
      workoutTime:      minutes * 60,
      intakedCalories:  intakedCalorie,
      burnedCalories:   burnedKcal,
      unburnedCalories: intakedCalorie - burnedKcal,
      workout_id:       workout.id,
    }
    expect(dispatchMock).toHaveBeenCalledWith(createWorkoutRecordThunk(expectedParams));
    // 送信後、値がリセット
    expect(screen.getByRole('kcal', {name: 'burned'})).toHaveTextContent('0');
    expect(screen.getByRole('kcal', {name: 'unburned'})).toHaveTextContent('0');
  });
});
