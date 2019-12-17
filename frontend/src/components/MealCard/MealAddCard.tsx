import React from 'react'
import { Icon } from '@blueprintjs/core'
import style from './MealCard.module.scss'
import { Link } from 'react-router-dom'
import { RouteBuilder } from 'src/views/routes'
import styles from './MealAddCard.module.scss'
import classnames from 'classnames'

export type Props = React.HTMLAttributes<HTMLDivElement>

const MealAddCard = ({ className, ...rest }: Props) => (
  <div className={classnames(style.mealCard, className)} {...rest}>
    <Link
      id={'add-meal-button'}
      to={RouteBuilder.toNewMealAdmin()}
      className={`bp3-button bp3-intent-success ${styles.addButton}`}>
      <Icon
        icon={'add'}
        iconSize={Icon.SIZE_STANDARD}
        className={styles.editButtonIcon}
      />
    </Link>
  </div>
)

export { MealAddCard }
