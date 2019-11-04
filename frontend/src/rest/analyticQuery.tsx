import { useGet } from 'restful-react'

export type AnalyticSource = 'bleh'
export type AnalyticKey = 'a'
export type AggregateGrain = 'a' | 'b' | 'c'

export type AnalyticResponseDatum = {
  time: Date
  value: number
}
export type AnalyticResponse = AnalyticResponseDatum[]

type Query = {
  source: AnalyticSource
  key: AnalyticKey
  grain: AggregateGrain
}

export default ({ source, key, grain }: Query) =>
  useGet<AnalyticResponse>({
    path: `/analytics/${source}`,
    queryParams: { key: `"${key}"`, grain: `"${grain}"` },
  })
