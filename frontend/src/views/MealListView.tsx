import React from 'react'
import { Container } from 'react-bootstrap'
import { MealCard, MealCardProps } from 'src/components/MealCard'
import { useMealListQuery } from 'src/rest/mealsQuery'
import { MealList } from "src/components/MealList"
import { createMeal } from 'src/models'

const makePlaceholderData = (n: number) => (
    Array.from(Array(n).keys()).map(i => createMeal({
        _id: `${i}`,
        name: "A"
    }))
)

type Props = {
    MealCard?: (props: MealCardProps) => JSX.Element
}

const MealListView = (props: Props) => {
    const { data, loading } = useMealListQuery()
    const dat = (loading || !data) ? makePlaceholderData(10) : data
    console.log(dat)

    return (
        <Container>
            <h1>Dostępne posiłki</h1>
            <MealList meals={dat} isLoading={loading} MealCard={props.MealCard || MealCard} />
        </Container>
    )
}

export { MealListView }
