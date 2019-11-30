import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useMealQuery } from 'src/rest/mealsQuery'
import { MealDetailsProps, MealDetails } from 'src/components/MealDetails'
import { createMeal } from 'src/models'

type Props = {
    MealDetails: (props: MealDetailsProps) => JSX.Element
}

const MealView = (props: Props) => {
  const { mealId } = useParams()

  const { data, loading } = useMealQuery({ _id: mealId! })
  const meal = (loading || !data) ? createMeal({}) : data

  const MealDetailsComponent = props.MealDetails || MealDetails

  return (
    <Container fluid={true}>
      {loading ? <h1 className="bp3-skeleton">Posiłek ???</h1> : <h1>Posiłek "{meal.name}"</h1>}
      <MealDetailsComponent meal={meal} loading={loading} />
    </Container>
  )
}

export { MealView }
