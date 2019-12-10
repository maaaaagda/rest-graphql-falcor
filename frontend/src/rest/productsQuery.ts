import { useGet } from 'restful-react'
import { resolveData } from './query'
import { Product } from 'src/models/product'

type SearchProductQuery = {
  name: string
}

export const useSearchProductQuery = (query: SearchProductQuery) =>
  useGet<Product[]>({
    path: `/products/dynamic`,
    resolve: resolveData<Product[]>(),
    queryParams: { name: query.name },
  })
