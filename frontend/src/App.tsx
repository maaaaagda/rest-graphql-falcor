import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { analyticQuery } from './rest'

const App = () => {
  const { data, loading } = analyticQuery({
    source: 'bleh',
    key: 'a',
    grain: 'a',
  })

  return <Card elevation={Elevation.THREE} />
}

export default App
