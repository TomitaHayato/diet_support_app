import { createContext } from "react";

// ログインユーザーに関する情報を管理
export const AuthContext     = createContext({});

// サイドメニューに使用するデータを管理
// - apiから取得したrecordデータ
// - テーマ, setTheme
export const SideMenuContext = createContext({});

// Workouts一覧を検索・絞り込みして表示する
export const FilterWorkoutsContext = createContext({});
