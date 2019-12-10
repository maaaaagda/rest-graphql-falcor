import { useGet } from 'restful-react'
import { Query, buildQueryParams, resolveData } from './query'
import { Meal, MealProduct } from 'src/models'

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

type SearchMealQuery = {
  name: string
}

export const useSearchMealQuery = (query: SearchMealQuery) =>
  useGet<MealProduct[]>({
    path: `/meals/dynamic`,
    resolve: resolveData<MealProduct[]>(),
    queryParams: { name: query.name },
  })
