import { useGet } from 'restful-react'
import { Query, buildQueryParams, resolveData } from './query'
import { Meal } from 'src/models'

interface MealsQuery extends Query {}

export const useMealsQuery = (query: MealsQuery = {}) =>
  useGet<Meal[]>({
    path: `/meals`,
    queryParams: buildQueryParams(query),
    resolve: resolveData<Meal[]>()
  })
