export type AnalyticData = {
  name: string
  values: AnalyticDatum[]
}

export type AnalyticDatum = {
  value: number
  time: Date
}
