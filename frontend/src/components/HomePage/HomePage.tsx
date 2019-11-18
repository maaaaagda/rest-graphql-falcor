import React from 'react'
import { Card } from '@blueprintjs/core'
import WhoAreWe from './WhoAreWe'
import WhyWe from './WhyWe'

const HomePage: React.FC = props => {
  return (
    <Card className="px-5">
      <WhoAreWe />
      <WhyWe />
    </Card>
  )
}

export default HomePage
