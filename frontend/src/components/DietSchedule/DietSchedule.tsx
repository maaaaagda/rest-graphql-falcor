import React from 'react'
import { DailyDiet, MEAL_TIME, MEAL_TIME_KEYS } from 'src/models'
import { Table } from 'react-bootstrap'
import moment from 'moment'
//import style from './DietSchedule.module.scss'

const MEAL_TIME_TRANSLATION: Record<MEAL_TIME, string> = {
  breakfast: 'śniadanie',
  afternoonSnack: 'popołudniowa przekąska',
  dinner: 'kolacja',
  lunch: 'lunch',
  morningSnack: 'podwieczorek',
}

type Props = {
  dailyDiets: DailyDiet[]
}

const DietSchedule = ({ dailyDiets }: Props) => (
  <Table responsive>
    <thead>
      <tr>
        <th>dzień</th>
        {MEAL_TIME_KEYS.map(key => (
          <th key={key}>{MEAL_TIME_TRANSLATION[key]}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {dailyDiets.map(diet => (
        <tr key={diet._id}>
          <td>{moment(diet.date).format('DD/MM/YY (dddd)')}</td>
          {MEAL_TIME_KEYS.map(key => (
            <td key={key}>{diet.dailyMeals[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
)

export { DietSchedule }
