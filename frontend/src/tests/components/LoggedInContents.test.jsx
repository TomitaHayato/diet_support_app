import { beforeAll, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoggedInContents from "../../components/general/sidemenu/LoggedInContents";

describe('コンポーネント: LoggedInContentsのテスト', () => {
  beforeAll(() => {
    // 子コンポーネントのmock化
    vi.mock('../../components/general/sidemenu/TodayData'           , () => ({ default: () => <div>TodayData</div>  }));
    vi.mock('../../components/general/sidemenu/charts/DataCharts'   , () => ({ default: () => <div>DataCharts</div> }));
    vi.mock('../../components/general/sidemenu/UserZone'            , () => ({ default: () => <div>UserZone</div>   }));
    vi.mock('../../components/general/sidemenu/auth_form/LogoutForm', () => ({ default: () => <div>LogoutForm</div> }));
    // レンダリング
    render(<LoggedInContents />)
  });

  test('コンテンツが表示される', () => {
    expect(screen.getByText('TodayData'));
    expect(screen.getByText('DataCharts'));
    expect(screen.getByText('UserZone'));
    expect(screen.getByText('LogoutForm'));
  });
});
