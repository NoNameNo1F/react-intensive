const AUTH_BASE = "/auth";

export const AUTH_URL = {
  BASE: AUTH_BASE,
  LOGIN: `${AUTH_BASE}/login`,
  SIGNUP: `${AUTH_BASE}/sign-up`,
};

const DASHBOARD_BASE = "/dashboard";
export const DASHBOARD_URL = {
  BASE: DASHBOARD_BASE,
  SUBMISSION: `${DASHBOARD_BASE}/submissions`,
  MY_SUBMISSION: `${DASHBOARD_BASE}/my-submissions`,
};

const PROFILE_BASE = "/profile";
export const PROFILE_URL = {
  BASE: PROFILE_BASE,
  KYC: `${PROFILE_BASE}/kyc`,
};
