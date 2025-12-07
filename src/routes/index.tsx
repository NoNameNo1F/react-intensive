import { createBrowserRouter, redirect } from "react-router";

import DashboardPage from "../pages/dashboard";
import Login from "../pages/login";

import AuthLayout from "../layouts/auth";
import SharedLayout from "../layouts/shared-layout";

import { AUTH_URL, DASHBOARD_URL, PROFILE_URL } from "../constant/url";

import { TOKEN } from "../constant/auth";
import ReviewSubmissionsPage from "../pages/dashboard/submit-review";
import ProfilePage from "../pages/profile";
import EditProfilePage from "../pages/profile/kyc";
import Signup from "../pages/signup";
import MySubmissionsPage from "../pages/submissions";
import AuthRedirect from "./auth-redirect";

const requireAuth = () => {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw redirect(AUTH_URL.LOGIN);
  }

  return null;
};

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AuthRedirect,
  },
  {
    path: AUTH_URL.BASE,
    Component: AuthLayout,
    children: [
      { index: true, Component: Login },
      { path: AUTH_URL.LOGIN, index: true, Component: Login },
      { path: AUTH_URL.SIGNUP, Component: Signup },
    ],
  },
  {
    path: DASHBOARD_URL.BASE,
    Component: SharedLayout,
    middleware: [requireAuth],
    children: [
      { index: true, Component: DashboardPage },
      {
        path: DASHBOARD_URL.SUBMISSION,
        Component: ReviewSubmissionsPage,
      },
      {
        path: DASHBOARD_URL.MY_SUBMISSION,
        Component: MySubmissionsPage,
      },
    ],
  },
  {
    path: PROFILE_URL.BASE,
    Component: SharedLayout,
    middleware: [requireAuth],
    children: [
      { index: true, Component: ProfilePage },
      {
        path: PROFILE_URL.KYC,
        Component: EditProfilePage,
      },
    ],
  },
]);

export default Router;
