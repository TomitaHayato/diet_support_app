import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Header from "../../components/general/header/Header";

test('ヘッダー', () => {
  render(<Header />);
  const appIntro = screen.getByTestId('app-intro');
  expect(appIntro).toBeInTheDocument();
});
