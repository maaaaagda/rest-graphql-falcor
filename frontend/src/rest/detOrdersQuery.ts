import { useGet } from 'restful-react'
import { Query, buildQueryParams, resolveData } from './query'
import { DietOrder } from 'src/models'

interface DietOrdersQuery extends Query { }

export const useDietOrdersQuery = (query: DietOrdersQuery = {}) =>
  useGet<DietOrder[]>({
    path: `/diet-orders`,
    queryParams: buildQueryParams(query),
    resolve: resolveData<DietOrder[]>()
  })
