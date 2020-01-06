import React from 'react'
import styles from './MealDetails.module.scss'
import { Meal } from 'src/models'
import { Formik, Form } from 'formik'
import { useUpdateMealMutation, useCreateMealMutation } from 'src/rest'
import { Button, TextArea } from '@blueprintjs/core'
import { AppState } from 'src/store/types'
import { Row, Col } from 'react-bootstrap'
import { IngredientList } from './IngredientList'
import { connect } from 'react-redux'
import { SimpleInput } from './SimpleInput'

const mapStateToProps = (state: AppState) => ({
  loggedInUser: state.user.loggedInUser,
})

export type MealDetailsProps = {
  meal: Meal
  editable?: boolean
} & ReturnType<typeof mapStateToProps>

const MealDetailsComponent = ({
  meal,
  editable,
  loggedInUser,
}: MealDetailsProps) => {
  const mealId = meal && meal._id
  const updateMeal = useUpdateMealMutation(mealId)
  const createMeal = useCreateMealMutation()
  const { mutate } = mealId ? updateMeal : createMeal

  const mealValues = {
    name: meal.name,
    ingredients: meal.ingredients,
    recipe: '',
    photo: meal.photo,
  }

  return (
    <Formik
      initialValues={mealValues}
      onSubmit={(values, actions) => {
        return mutate(values).catch(err => {
          actions.setStatus(err.data ? err.data.message : err.message)
        })
      }}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        isSubmitting,
        status,
        setFieldValue,
      }) => (
        <Form className={styles.container}>
          <Row className="mx-0">
            <Col md={6}>
              <SimpleInput
                label="Nazwa"
                name="name"
                placeholder="nazwa posiłku"
                disabled={!editable}
                touched={touched}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </Col>
          </Row>
          <Row className="mx-0">
            <Col md={5}>
              <h1>Składniki:</h1>
              <IngredientList
                ingredients={values.ingredients || []}
                disabled={!editable}
                setIngredients={v => setFieldValue('ingredients', v)}
                className={styles.ingredientList}
              />
            </Col>
            <Col md={7}>
              <h1>Przepis:</h1>
              <TextArea
                name="recipe"
                growVertically={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.recipe}
                className={styles.recipe}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8}>
              <SimpleInput
                label="zdjęcie"
                name="photo"
                placeholder="http://..."
                disabled={!editable}
                touched={touched}
                errors={errors}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </Col>
            <Col md={4}>
              <div className={styles.photo}>
                <img src={values.photo} />
              </div>
            </Col>
          </Row>
          <Button
            intent="success"
            text={mealId ? 'Zaktualizuj' : 'Dodaj'}
            type="submit"
            disabled={isSubmitting || !editable}
            className="d-block"
          />
          {status && <p className="text-danger mt-2">{status}</p>}
        </Form>
      )}
    </Formik>
  )
}

const MealDetails = connect(mapStateToProps)(MealDetailsComponent)

export { MealDetails }
