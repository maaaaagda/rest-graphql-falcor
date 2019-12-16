import React from 'react'
import { useMealQuery } from 'src/rest'
import { MealForm } from 'src/components/MealForm'
import { useParams } from 'react-router-dom'

type Props = {
  editable?: boolean
}

const ExistingMealView = (props: Props) => {
  const { mealId } = useParams()
  const { data, loading } = useMealQuery({ _id: mealId || '' })

  return <MealForm data={data} loading={loading} editable={props.editable} />
}

export { ExistingMealView }
