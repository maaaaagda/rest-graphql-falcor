import { useMutate } from 'restful-react'
import { Meal } from 'src/models'

type UpdateMealMutation = Omit<Meal, "_id">

export const useUpdateMealMutation = (mealId: string) =>
    useMutate<any, any, any, UpdateMealMutation>({
        verb: "PUT",
        path: `/meals`,
        queryParams: { mealId }
    })

type CreateMealMutation = Omit<Meal, "_id">

export const useCreateMealMutation = () =>
    useMutate<any, any, any, CreateMealMutation>({
        verb: "POST",
        path: `/meals`
    })