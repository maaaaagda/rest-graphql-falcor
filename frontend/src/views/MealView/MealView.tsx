import React from 'react'
import { useParams } from 'react-router-dom'
import { NewMealView } from './NewMealView'
import { ExistingMealView } from './ExistingMealView'

type Props = {
  editable?: boolean
}

const MealView = (props: Props) => {
  const { mealId } = useParams()

  return mealId === 'new' ? (
    <NewMealView editable={props.editable} />
  ) : (
    <ExistingMealView mealId={mealId!} editable={props.editable} />
  )
}

export { MealView }
