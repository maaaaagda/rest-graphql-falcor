import React from 'react'
import { useMealQuery } from 'src/rest'
import { MealForm } from 'src/components/MealForm'

type Props = {
  mealId: string
  editable?: boolean
}

const ExistingMealView = (props: Props) => {
  const { data, loading } = useMealQuery({ _id: props.mealId })

  return <MealForm data={data} loading={loading} editable={props.editable} />
}

export { ExistingMealView }
