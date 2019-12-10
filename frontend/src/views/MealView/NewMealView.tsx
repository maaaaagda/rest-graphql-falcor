import React from 'react'
import { createMeal } from 'src/models'
import { MealForm } from 'src/components/MealForm'

type Props = {
  editable?: boolean
}

const NewMealView = (props: Props) => {
  const data = createMeal({ name: 'Nowy posiłek' })

  return <MealForm data={data} editable={props.editable} />
}

export { NewMealView }
