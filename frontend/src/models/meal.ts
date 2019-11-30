export type MealProduct = {
    productId: string
    weight: number
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