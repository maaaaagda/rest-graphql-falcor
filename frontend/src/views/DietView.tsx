import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DietSchedule } from 'src/components/DietSchedule'
import { DailyDiet } from 'src/models'

const dailyDiets: DailyDiet[] = [
  {
    _id: '1',
    diet: '0',
    dailyMeals: {
      breakfast: 'cos',
      afternoonSnack: null,
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
  {
    _id: '2',
    diet: '0',
    dailyMeals: {
      breakfast: null,
      afternoonSnack: 'nic',
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
  {
    _id: '3',
    diet: '0',
    dailyMeals: {
      breakfast: null,
      afternoonSnack: null,
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
  {
    _id: '4',
    diet: '0',
    dailyMeals: {
      breakfast: null,
      afternoonSnack: null,
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
]

const DietView = () => {
  const { dietId } = useParams()

  return (
    <Container fluid={true}>
      <h1>Dieta {dietId}</h1>
      <DietSchedule dailyDiets={dailyDiets} />
    </Container>
  )
}

export { DietView }
