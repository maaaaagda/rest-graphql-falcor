import React from 'react'
import s from './styles.module.scss'
import { Card, Elevation, Icon } from '@blueprintjs/core'
import classNames from 'classnames'

const Attribute: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <Card elevation={Elevation.TWO} className={classNames(s.attribute, 'm-3')}>
      <h1 className={s.cardHeader}>
        <Icon icon={'endorsed'} iconSize={50} /> {title}
      </h1>
      <div>
        <p>{description}</p>
      </div>
    </Card>
  )
}

export default Attribute
