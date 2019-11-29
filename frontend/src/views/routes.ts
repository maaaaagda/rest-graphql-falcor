export const RouteBuilder = {
  toIndex: () => '/',
  toDashboard: () => '/panel',
  toLogin: () => `/login`,
  toLogout: () => `/logout`,
  toDieticianPanel: () => `${RouteBuilder.toDashboard()}/admin`,
  toDietList: () => `${RouteBuilder.toDashboard()}/diets`,
  toDietListAdmin: () => `${RouteBuilder.toDieticianPanel()}/diets`,
  toFoodListAdmin: () => `${RouteBuilder.toDieticianPanel()}/products`,
  toDiet: (dietId: string) => `${RouteBuilder.toDietList()}/${dietId}`,
  toDietAdmin: (dietId: string) => `${RouteBuilder.toDietListAdmin()}/${dietId}`,
}
