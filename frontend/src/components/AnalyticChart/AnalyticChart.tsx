import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { AnalyticData } from './analyticData'
import moment from 'moment'
import { Spinner } from '@blueprintjs/core'
import styles from './styles.module.scss'

type Props = {
  data?: AnalyticData[]
  width?: number
  height?: number
}

const dataToRecharts = (data: AnalyticData[]): ReadonlyArray<object> => {
  const rechartData = []
  for (const dataSource of data) {
    rechartData.push(
      ...dataSource.values.map(v => ({
        [dataSource.name]: v.value,
        time: v.time,
      }))
    )
  }
  return rechartData
}

const formatLongDate = (tickItem: Date) => moment(tickItem).format('LL LT')
const formatShortDate = (tickItem: Date) => moment(tickItem).format('DD MMM YY')

const AnalyticChart = ({ data, width = 500, height = 300 }: Props) =>
  data ? (
    <LineChart
      width={width}
      height={height}
      data={dataToRecharts(data)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" tickFormatter={formatShortDate} />
      <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
      <Tooltip labelFormatter={v => formatLongDate((v as unknown) as Date)} />
      <Legend />
      {data &&
        data.map(d => (
          <Line
            type="linear"
            dataKey={d.name}
            stroke="#8884d8"
            dot={false}
            key={d.name}
          />
        ))}
    </LineChart>
  ) : (
    <div className={styles.analyticChartWrapper} style={{ width, height }}>
      <Spinner intent="primary" size={30} />
    </div>
  )

export default AnalyticChart
