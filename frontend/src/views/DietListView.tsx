import React from 'react'
import { Container } from 'react-bootstrap'
import { DietList } from 'src/components/DietList'
import { useDietsQuery } from "src/rest"
import { Diet } from 'src/models'
import { DietCard, DietCardProps } from 'src/components/DietCard'

const makePlaceholderData = (n: number) => (
  Array.from(Array(n).keys()).map(i => ({ _id: `${i}`, name: "", dailyCost: 0 } as Diet))
)

type Props = {
  DietCard?: (props: DietCardProps) => JSX.Element
}

const DietListView = (props: Props) => {
  const { data, loading } = useDietsQuery()
  const dat = (loading || !data) ? makePlaceholderData(10) : data

  return (
    <Container>
      <h1>Dostępne diety</h1>
      <DietList diets={dat} isLoading={loading} DietCard={props.DietCard || DietCard} />
    </Container>
  )
}

export { DietListView }
