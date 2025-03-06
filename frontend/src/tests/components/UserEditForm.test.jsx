import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { updateUserThunk } from "../../Redux/Slice/currentUserSlice";
import userEvent from "@testing-library/user-event";
import { dammyCurrentUser, renderWithProviders } from "../testUtils";
import UserEditForm from "../../components/general/sidemenu/UserEditForm";
import { useDispatch } from "react-redux";

describe('コンポーネント： UserEditForm.jsxのテスト', () => {
  let dispatchMock

  beforeEach(() => {
    // useDispatchのMock化
    vi.mock('react-redux', async() => {
      const original = await vi.importActual('react-redux');
      return {
        ...original,
        useDispatch: vi.fn(),
      }
    })
    dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);

    // updateUserThunkをMock化
    vi.mock('../../Redux/Slice/currentUserSlice', async() => {
      const original = await vi.importActual('../../Redux/Slice/currentUserSlice');
      return {
        ...original,
        updateUserThunk: vi.fn(),
      }
    });
  });

  afterEach(() => cleanup());

  test('バリデーションエラーがerrorに格納', async() => {
    const user = userEvent.setup();
    // 渡されるprops = setStateのMock化
    const setEditModeMock = vi.fn();
    renderWithProviders(<UserEditForm setEditMode={setEditModeMock} />, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
      }
    });
    const nameForm = screen.getByLabelText('名前');
    const weightForm = screen.getByLabelText('体重');
    const emailForm = screen.getByLabelText('メール');
    const updateBtn = screen.getByRole('button', {name: 'user-update-btn'});
    await user.clear(nameForm);
    await user.clear(weightForm);
    await user.type(weightForm, '-1');
    await user.clear(emailForm);
    await user.click(updateBtn);
    // バリデーションエラーの場合、Thunkは実行されない
    expect(updateUserThunk).not.toHaveBeenCalled();
    // エラーメッセージが表示される
    expect(screen.getByRole('error', {name: 'name'})  ).toHaveTextContent('名前を入力してください');
    expect(screen.getByRole('error', {name: 'weight'})).toHaveTextContent('0以上の整数を入力してください');
    expect(screen.getByRole('error', {name: 'email'}) ).toHaveTextContent('メールアドレスを入力してください');
  });

  test('正常入力 => updateUser()が実行', async() => {
    // テスト用の入力値
    const testParams = {
      name: 'new name',
      weight: '100',
      email: 'test2@email.com',
    }
    const user = userEvent.setup();
    // 渡されるprops = setStateのMock化
    const setEditModeMock = vi.fn();
    renderWithProviders(<UserEditForm setEditMode={setEditModeMock} />, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
      }
    });
    const nameForm = screen.getByLabelText('名前');
    const weightForm = screen.getByLabelText('体重');
    const emailForm = screen.getByLabelText('メール');
    const updateBtn = screen.getByRole('button', {name: 'user-update-btn'});

    await user.clear(nameForm);
    await user.clear(weightForm);
    await user.clear(emailForm);
    await user.type(nameForm  , testParams.name);
    await user.type(weightForm, testParams.weight);
    await user.type(emailForm , testParams.email);
    await user.click(updateBtn);

    expect(dispatchMock).toHaveBeenCalledWith(updateUserThunk(testParams));
    expect(setEditModeMock).toHaveBeenCalledWith(false);
  });

  test('update処理中にエラー => エラーメッセージがUIに表示', async() => {
    updateUserThunk.mockImplementation(() => {
      throw new Error;
    })
    // テスト用の入力値
    const testParams = {
      name: 'new name',
      weight: '100',
      email: 'test2@email.com',
    }
    const user = userEvent.setup();
    // 渡されるprops = setStateのMock化
    const setEditModeMock = vi.fn();
    renderWithProviders(<UserEditForm setEditMode={setEditModeMock} />, {
      preloadedState: {
        currentUser: dammyCurrentUser(),
      }
    });
    const nameForm = screen.getByLabelText('名前');
    const weightForm = screen.getByLabelText('体重');
    const emailForm = screen.getByLabelText('メール');
    const updateBtn = screen.getByRole('button', {name: 'user-update-btn'});

    await user.clear(nameForm);
    await user.clear(weightForm);
    await user.clear(emailForm);
    await user.type(nameForm  , testParams.name);
    await user.type(weightForm, testParams.weight);
    await user.type(emailForm , testParams.email);
    await user.click(updateBtn);

    expect(updateUserThunk).toHaveBeenCalled();
    expect(setEditModeMock).not.toHaveBeenCalled();
    expect(screen.getByRole('error-message', {name: 'user-update-error'})).toHaveTextContent('プロフィール編集に失敗しました');
  });
});
