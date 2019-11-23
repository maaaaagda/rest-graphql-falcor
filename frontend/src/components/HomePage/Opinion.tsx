import React from 'react'
import s from './styles.module.scss'
import { Card, Elevation } from '@blueprintjs/core'
import classNames from 'classnames'

const Opinion: React.FC<{
  name: string
  opinion: string
  photoPath: string
}> = ({ name, opinion, photoPath }) => {
  return (
    <Card
      elevation={Elevation.TWO}
      className={classNames(s.opinionContainer, 'm-3')}>
      <div className={'row'}>
        <div className={'col-7'}>
          <img
            src={photoPath}
            className={s.customerPhoto}
            alt="reviewer opinion"
          />
        </div>
        <div className={'col-5'}>
          <p>{name}</p>
          <p>{`"${opinion}"`}</p>
        </div>
      </div>
    </Card>
  )
}

export default Opinion
