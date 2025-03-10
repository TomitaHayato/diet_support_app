import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Header from "../../components/general/header/Header";
import { Provider } from "react-redux";
import { store } from "../../Redux/store";

test('ヘッダー', () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const appIntro = screen.getByTestId('app-intro');
  expect(appIntro).toBeInTheDocument();
});
