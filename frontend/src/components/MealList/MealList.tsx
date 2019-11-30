import React from 'react'
import { Meal } from 'src/models'
import { MealCardProps } from 'src/components/MealCard'
import classnames from "classnames"
import style from './MealList.module.scss'

type Props = {
  meals: Meal[]
  isLoading?: boolean
  MealCard: (props: MealCardProps) => JSX.Element
}

const MealList = ({ meals, isLoading, MealCard }: Props) => (
  <div className={style.mealContainer}>
    {meals.map(meal => (
      <MealCard data={meal} key={meal._id} className={classnames(style.mealCard, isLoading && "bp3-skeleton")} />
    ))}
  </div>
)

export { MealList }
