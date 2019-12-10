import React from 'react'
import { Container } from 'react-bootstrap'
import { MealDetails } from 'src/components/MealDetails'
import { Meal } from 'src/models'

type Props = {
  editable?: boolean
  data?: Nullable<Meal>
  loading?: boolean
}

const MealForm = (props: Props) => (
  <Container fluid={true}>
    {props.loading || !props.data ? (
      <h1 className="bp3-skeleton">???</h1>
    ) : (
      <>
        <h1>{props.data.name}</h1>
        <MealDetails meal={props.data} editable={props.editable} />
      </>
    )}
  </Container>
)

export { MealForm }
