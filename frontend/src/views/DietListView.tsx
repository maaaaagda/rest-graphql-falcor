import React from 'react'
import { Container } from 'react-bootstrap'
import { DietList } from 'src/components/DietList'
import { useDietsQuery } from "src/rest"
import { Diet } from 'src/models'

const makePlaceholderData = (n: number) => (
  Array.from(Array(n).keys()).map(i => ({ _id: `${i}`, name: "", dailyCost: 0 } as Diet))
)

const DietListView = () => {
  const { data, loading } = useDietsQuery()
  const dat = (loading || !data) ? makePlaceholderData(10) : data
  console.log(dat)

  return (
    <Container>
      <h1>Dostępne diety</h1>
      <DietList diets={dat} isLoading={loading} />
    </Container>
  )
}

export { DietListView }
