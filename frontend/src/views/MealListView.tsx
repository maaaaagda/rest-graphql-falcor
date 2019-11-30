import React from 'react'
import { Container } from 'react-bootstrap'
import { MealCard, MealCardProps } from 'src/components/MealCard'
import { useMealsQuery } from 'src/rest/mealsQuery'
import { MealList } from "src/components/MealList"
import { Meal } from 'src/models'

const makePlaceholderData = (n: number) => (
    Array.from(Array(n).keys()).map(i => ({
        _id: `${i}`,
        name: "A",
        ingredients: [],
        kcal: 0,
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        fibre: 0,
        photo: ""
    } as Meal))
)

type Props = {
    MealCard?: (props: MealCardProps) => JSX.Element
}

const MealListView = (props: Props) => {
    const { data, loading } = useMealsQuery()
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
