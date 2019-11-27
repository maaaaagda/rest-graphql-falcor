import { useGet } from 'restful-react'
import { Query, buildQueryParams, resolveData } from './query'
import { Diet } from 'src/models'

interface DietsQuery extends Query {}

export const useDietsQuery = (query: DietsQuery = {}) =>
  useGet<Diet[]>({
    path: `/diets`,
    queryParams: buildQueryParams(query),
    resolve: resolveData<Diet[]>()
  })
