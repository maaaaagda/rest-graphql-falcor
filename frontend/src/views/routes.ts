export const RouteBuilder = {
  toIndex: () => '/',
  toDashboard: () => '/panel',
  toLogin: () => `/login`,
  toLogout: () => `/logout`,
  toDieticianPanel: () => `${RouteBuilder.toDashboard()}/admin`,
  toDietList: () => `${RouteBuilder.toDashboard()}/diets`,
  toDiet: (dietId: string) => `${RouteBuilder.toDietList()}/${dietId}`,
}
