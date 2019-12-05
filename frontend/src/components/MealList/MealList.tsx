import React from 'react'
import { Meal } from 'src/models'
import classnames from "classnames"
import style from './MealList.module.scss'
import { MealCard, MealAddCard } from '../MealCard'

type Props = {
  meals: Meal[]
  isLoading?: boolean
  editable?: boolean
}

const MealList = ({ meals, isLoading, editable }: Props) => (
  <div className={style.mealContainer}>
    {meals.map(meal => (
      <MealCard data={meal} key={meal._id} className={classnames(style.mealCard, isLoading && "bp3-skeleton")} editable={editable} />
    ))}
    {editable && <MealAddCard className={style.mealCardAdd} />}
  </div>
)

export { MealList }
