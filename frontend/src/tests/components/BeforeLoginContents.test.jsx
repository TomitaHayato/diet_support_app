import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { renderWithProviders } from "../testUtils";
import BeforeLoginContents from "../../components/general/sidemenu/BeforeLoginContents";

describe('Unit: BeforeLoginContents.jsx', () => {
  beforeEach(() => {
    // 子コンポーネントのMock化
    vi.mock('../../components/general/sidemenu/auth_form/LoginForm', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>LoginForm</p>)
      }
    });
    vi.mock('../../components/general/sidemenu/auth_form/SignupModal', () => {
      return {
        default: vi.fn().mockImplementation(() => <p>SignupModal</p>)
      }
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('LoginForm, SignupModalが表示されている', () => {
    renderWithProviders(<BeforeLoginContents />);
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
    expect(screen.getByText('SignupModal')).toBeInTheDocument();
  });
})