import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Header from "../../components/general/header/Header";
import { Provider } from "react-redux";
import { store } from "../../Redux/store";
import { BrowserRouter } from "react-router-dom";

test('ヘッダー', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const appIntro = screen.getByTestId('app-intro');
  expect(appIntro).toBeInTheDocument();
});
