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
};

const SUBMISSION_BASE = "/submissions";
export const SUBMISSION_URL = {
  BASE: SUBMISSION_BASE,
};

const PROFILE_BASE = "/profile";
export const PROFILE_URL = {
  BASE: PROFILE_BASE,
  EDIT: `${PROFILE_BASE}/edit`,
};
