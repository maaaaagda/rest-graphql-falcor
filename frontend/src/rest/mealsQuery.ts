import { useGet } from 'restful-react'
import { Query, buildQueryParams, resolveData } from './query'
import { Meal } from 'src/models'

interface MealsQuery extends Query {}

export const useMealListQuery = (query: MealsQuery = {}) =>
  useGet<Meal[]>({
    path: `/meals`,
    queryParams: buildQueryParams(query),
    resolve: resolveData<Meal[]>(),
  })

type MealQuery = {
  _id: string
}

export const useMealQuery = (query: MealQuery) =>
  useGet<Meal>({
    path: `/meals/${query._id}`,
    resolve: resolveData<Meal>(),
  })
