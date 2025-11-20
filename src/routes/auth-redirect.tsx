import { Navigate } from "react-router";

import { useAuth } from "../hooks/use-auth";

import { DASHBOARD_URL, AUTH_URL } from "../constant/url";

export default function AuthRedirect() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to={DASHBOARD_URL.BASE} replace />;

  return <Navigate to={AUTH_URL.LOGIN} replace />;
}
