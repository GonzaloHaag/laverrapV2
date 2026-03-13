import { AUTH_STORAGE_KEY } from "@/utils/consts";
import { PUBLIC_ROUTES } from "@/utils/routes";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const currentUser = localStorage.getItem(AUTH_STORAGE_KEY);
  if(!currentUser) return <Navigate to={PUBLIC_ROUTES.LOGIN.path} replace />;
  return <>{children}</>;
};