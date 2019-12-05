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

  const { data, loading } = mealId !== "new" ? useMealQuery({ _id: mealId! }) : { data: createMeal({}), loading: false }

  const MealDetailsComponent = props.MealDetails || MealDetails

  return (
    <Container fluid={true}>
      {loading ? <h1 className="bp3-skeleton">Posiłek ???</h1> : <h1>Posiłek "{data!.name}"</h1>}
      {loading ? null : <MealDetailsComponent meal={data!} />}
    </Container>
  )
}

export { MealView }
