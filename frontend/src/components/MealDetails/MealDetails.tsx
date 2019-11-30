import React from 'react'
import styles from './MealDetails.module.scss'
import { Meal } from 'src/models'

export type MealDetailsProps = {
    meal: Meal
    editable?: boolean
    loading: boolean
}

const MealDetails = ({ meal }: MealDetailsProps) => (
    <div className={styles.container}>
        <h1>{meal.name}</h1>
    </div>
)

export { MealDetails }
