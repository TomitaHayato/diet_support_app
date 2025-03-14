import { cleanup, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { addLikedWorkoutIdsThunk, removeLikedWorkoutIdsThunk } from "../../Redux/Slice/currentUserSlice";
import { dammyCurrentUser, dammyWorkout, renderWithProviders } from "../testUtils";
import userEvent from "@testing-library/user-event";
import LikeWorkoutBtn from "../../components/general/LikeWorkoutBtn";

function currentUserPreloadedState() {
  return {
    user: dammyCurrentUser(),
    likedWorkoutIds: [2, 4],
    status: 'successed',
    error: null,
  }
}

describe('LikeWorkoutBtn.jsxのテスト', () => {
  let dispatchMock

  beforeEach(() => {
    // useDispatchのMock
    vi.mock('react-redux', async() => {
      const original = await vi.importActual('react-redux');
      return {
        ...original,
        useDispatch: vi.fn(),
      }
    });
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
    // removeLikedWorkoutIdsThunk, addLikedWorkoutIdsThunkのMock
    vi.mock('../../Redux/Slice/currentUserSlice', async() => {
      const original = await vi.importActual('../../Redux/Slice/currentUserSlice');
      return {
        ...original,
        removeLikedWorkoutIdsThunk: vi.fn(),
        addLikedWorkoutIdsThunk: vi.fn(),
      }
    });
  });

  afterEach(() => cleanup());

  test('お気に入り登録していないWorkoutがpropsから渡された場合 => OFFのアイコンを持つbuttonが表示 + button ClickでaddLikedWorkoutIdsThunkを実行', async() => {
    // propsのMock
    const workout = dammyWorkout(1)
    const user = userEvent.setup();
    renderWithProviders(<LikeWorkoutBtn workout={workout}/>, {
      preloadedState: {
        currentUser: currentUserPreloadedState(),
      }
    });
    const likedBtn = screen.getByRole('button', {name: 'liked-button'});
    // 初期表示
    expect(likedBtn).toBeInTheDocument();
    expect(screen.getByRole('liked-icon', {name: 'off'})).toBeInTheDocument();
    expect(screen.queryByRole('liked-icon', {name: 'on'})).toBe(null);
    // button Click
    await user.click(likedBtn);
    // addLikedWorkoutIdsThunkがdispatchされる
    expect(dispatchMock).toHaveBeenCalledWith(addLikedWorkoutIdsThunk(workout));
    expect(removeLikedWorkoutIdsThunk).not.toHaveBeenCalled();
  });

  test('お気に入り登録していないWorkoutがpropsから渡された場合 => OFFのアイコンを持つbuttonが表示 + button ClickでremoveLikedWorkoutIdsThunkを実行', async() => {
    // propsのMock
    const workout = dammyWorkout(2)
    const user = userEvent.setup();
    renderWithProviders(<LikeWorkoutBtn workout={workout}/>, {
      preloadedState: {
        currentUser: currentUserPreloadedState(),
      }
    });
    const likedBtn = screen.getByRole('button', {name: 'liked-button'});
    // 初期表示
    expect(likedBtn).toBeInTheDocument();
    expect(screen.getByRole('liked-icon', {name: 'on'})).toBeInTheDocument();
    expect(screen.queryByRole('liked-icon', {name: 'off'})).toBe(null);
    // button Click
    await user.click(likedBtn);
    // addLikedWorkoutIdsThunkがdispatchされる
    expect(dispatchMock).toHaveBeenCalledWith(removeLikedWorkoutIdsThunk(workout));
    expect(addLikedWorkoutIdsThunk).not.toHaveBeenCalled();
  });

  // TODO: どうやってstoreの状態を変化させる？reducerをSliceに追加?
  test('currentUserステートのlikedWorkoutIds属性が変化 => setIsLikedが実行される', async() => {
  })
})