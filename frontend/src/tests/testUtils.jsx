import { Provider } from "react-redux";
import { storeForTest } from "../Redux/store";
import { render } from "@testing-library/react";

// Providerで囲まれたコンポーネントをrenderする
// storeを新しく生成して、ステートの初期値を上書きする
export function renderWithProviders (
  ui,
  {
    preloadedState={},
    store = storeForTest(preloadedState),
    ...renderOptions
  } = {}
) {
  function ProviderWrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: ProviderWrapper, ...renderOptions }) }
}

export function dammyCurrentUser() {
  return {
    user: {
      id: 999,
      name: "test",
      weight: 60,
      email: 'test@email.com',
    },
    likedWorkoutIds: [],
    status: 'successed',
    error: null,
  }
}

export function dammyWorkout(id=1, kcalPerSec=1) {
  return {
    id,
    burnedKcalPerMin: 60 * kcalPerSec,
    burnedKcalPerSec: kcalPerSec,
    name: 'test workout',
    requiredExerciseTime: 10,
    tagList: ['tag1', 'tag2'],
  }
}

export function dammyIntakedCalorie(value=100) {
  return {
    value,
  }
}
