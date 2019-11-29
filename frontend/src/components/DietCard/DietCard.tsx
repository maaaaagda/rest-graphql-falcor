import React from 'react'
import { Card, Elevation, ICardProps } from '@blueprintjs/core'
import { Diet } from 'src/models'
import style from './DietCard.module.scss'
import { Link } from 'react-router-dom'
import { RouteBuilder } from 'src/views/routes'

type Props = {
  data: Diet
  editable?: boolean
} & ICardProps

export type DietCardProps = Props

const DietCard = ({
  data: { _id, name, dailyCost },
  className,
  editable,
  ...rest
}: Props) => (
    <Card
      elevation={Elevation.TWO}
      className={`${style.dietCard} ${className || ''}`}
      {...rest}>
      <h5 className={style.name}>{name}</h5>
      <span className={style.cost}>{dailyCost}zł / dzień</span>
      <div className={style.navigation}>
        {editable ? (
          <Link
            to={RouteBuilder.toDietAdmin(_id)}
            className="bp3-button bp3-intent-success">
            Edytuj
      </Link>
        ) : (
            <Link
              to={RouteBuilder.toDiet(_id)}
              className="bp3-button bp3-intent-success">
              Pokaż
      </Link>
          )}
      </div>
    </Card>
  )

export { DietCard }
