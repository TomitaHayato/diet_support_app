import { createContext, useContext } from "react";

export const AuthsContext     = createContext();
export const LikedIdsContext = createContext();

export function useAuth() {
  return useContext(AuthsContext);
}

export function useLikedIds() {
  return useContext(LikedIdsContext);
}
