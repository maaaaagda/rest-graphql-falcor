import { useMutate } from 'restful-react'
import { ID } from 'src/models'

type Ingredient = {
  productId: ID
  weight: number
}

type MealMutation = {
  name: string
  ingredients: Ingredient[]
  receipe: string
  authorId: ID
  photo: string
}

export const useUpdateMealMutation = (mealId: string) =>
  useMutate<any, any, any, MealMutation>({
    verb: 'PUT',
    path: `/meals`,
    queryParams: { mealId },
  })

export const useCreateMealMutation = () =>
  useMutate<any, any, any, MealMutation>({
    verb: 'POST',
    path: `/meals`,
  })
