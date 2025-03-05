import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import LoggedInContents from "../../components/general/sidemenu/LoggedInContents";
import { renderWithProviders } from "../testUtils";

describe('コンポーネント: LoggedInContentsのテスト', () => {
  beforeEach(() => {
    // 子コンポーネントのmock化
    vi.mock('../../components/general/sidemenu/TodayData', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>TodayData</p>),
      }
    });
    vi.mock('../../components/general/sidemenu/charts/DataCharts', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>DataCharts</p>),
      }
    });
    vi.mock('../../components/general/sidemenu/UserZone', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>UserZone</p>),
      }
    });
    vi.mock('../../components/general/sidemenu/auth_form/LogoutForm', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>LogoutForm</p>),
      }
    });
  });

  afterEach(() => {
    cleanup();
  })

  test('コンテンツが表示される', () => {
    renderWithProviders(<LoggedInContents />);
    expect(screen.getByText('TodayData')).toBeInTheDocument();
    expect(screen.getByText('DataCharts')).toBeInTheDocument();
    expect(screen.getByText('UserZone')).toBeInTheDocument();
    expect(screen.getByText('LogoutForm')).toBeInTheDocument();
  });
});
