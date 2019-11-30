import React from 'react'
import { Card, Elevation, ICardProps } from '@blueprintjs/core'
import style from './MealCard.module.scss'
import { Link } from 'react-router-dom'
import { RouteBuilder } from 'src/views/routes'
import { Meal } from 'src/models/meal'

type Props = {
  data: Meal
  editable?: boolean
} & ICardProps

export type MealCardProps = Props

const MealCard = ({
  data,
  className,
  editable,
  ...rest
}: Props) => (
    <Card
      elevation={Elevation.TWO}
      className={`${style.mealCard} ${className || ''}`}
      {...rest}>
      <h5 className={style.name}>{data.name}</h5>
      <div className={style.navigation}>
        {editable ? (
          <Link
            to={RouteBuilder.toMealAdmin(data._id)}
            className="bp3-button bp3-intent-success">
            Edytuj
      </Link>
        ) : (
            <Link
              to={RouteBuilder.toMeal(data._id)}
              className="bp3-button bp3-intent-success">
              Pokaż
      </Link>
          )}
      </div>
    </Card>
  )

export { MealCard }
