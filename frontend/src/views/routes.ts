export const RouteBuilder = {
  toIndex: () => '/',
  toDashboard: () => '/panel',
  toLogin: () => `/login`,
  toLogout: () => `/logout`,
  toDieticianPanel: () => `${RouteBuilder.toDashboard()}/admin`,
  toDietList: () => `${RouteBuilder.toDashboard()}/diets`,
  toMealList: () => `${RouteBuilder.toDashboard()}/meals`,
  toDietListAdmin: () => `${RouteBuilder.toDieticianPanel()}/diets`,
  toMealListAdmin: () => `${RouteBuilder.toDieticianPanel()}/meals`,
  toFoodListAdmin: () => `${RouteBuilder.toDieticianPanel()}/products`,
  toDiet: (dietId: string) => `${RouteBuilder.toDietList()}/${dietId}`,
  toDietAdmin: (dietId: string) => `${RouteBuilder.toDietListAdmin()}/${dietId}`,
  toMeal: (dietId: string) => `${RouteBuilder.toMealList()}/${dietId}`,
  toMealAdmin: (dietId: string) => `${RouteBuilder.toMealListAdmin()}/${dietId}`,
}
