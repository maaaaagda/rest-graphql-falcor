import React from 'react'
import { Card } from '@blueprintjs/core'
import WhoAreWe from './WhoAreWe'
import WhyWe from './WhyWe'
import ReallyEko from './ReallyEko'
import PeopleWhoTrustedUs from './PeopleWhoTrustedUs'

const HomePage: React.FC = props => {
  return (
    <Card className="px-5">
      <WhoAreWe />
      <WhyWe />
      <ReallyEko />
      <PeopleWhoTrustedUs />
    </Card>
  )
}

export default HomePage
