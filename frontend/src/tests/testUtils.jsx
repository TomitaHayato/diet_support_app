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
