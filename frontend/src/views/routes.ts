const DASHBOARD_ROUTE = '/panel'

export const RouteBuilder = {
  toIndex: () => '/',
  toDashboard: () => DASHBOARD_ROUTE,
  toLogin: () => `/login`,
  toLogout: () => `/logout`,
}
