export type MealProduct = {
  productId: string
  weight: number
  name: string
}

export type Meal = {
  _id: string
  name: string
  ingredients: MealProduct[]
  kcal: number
  protein: number
  carbohydrate: number
  fat: number
  fibre: number
  photo: string
}

export const createMeal = (meal: Partial<Meal>) => ({
  _id: '',
  name: 'A',
  ingredients: [],
  kcal: 0,
  protein: 0,
  carbohydrate: 0,
  fat: 0,
  fibre: 0,
  photo: '',
  ...meal,
})
