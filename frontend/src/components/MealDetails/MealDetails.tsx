import React from 'react'
import styles from './MealDetails.module.scss'
import { Meal } from 'src/models'
import { Formik, Form } from 'formik'
import {
  useUpdateMealMutation,
  useCreateMealMutation,
} from 'src/rest/mealMutation'
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
  const updateMeal = useUpdateMealMutation(meal && meal._id)
  const createMeal = useCreateMealMutation()
  const { mutate } = meal ? updateMeal : createMeal

  const mealValues = {
    name: meal.name,
    ingredients: meal.ingredients,
    receipe: 'test',
    authorId: loggedInUser ? loggedInUser.id : '',
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
                label="nazwa"
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
            <Col md={6}>
              <SimpleInput
                label="kcal na 100g"
                name="kcal"
                placeholder=""
                disabled={!editable}
                touched={touched}
                errors={errors}
                values={values}
                type="number"
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </Col>
          </Row>
          <Row className="mx-0">
            <Col md={4} className="px-0">
              <h1>Składniki:</h1>
              <IngredientList
                ingredients={values.ingredients}
                disabled={!editable}
                setIngredients={v => setFieldValue('ingredients', v)}
                className={styles.ingredientList}
              />
            </Col>
            <Col md={8} className="px-0">
              <h1>Przepis:</h1>
              <TextArea
                name="receipe"
                growVertically={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.receipe}
                className={styles.recipe}
              />
            </Col>
          </Row>
          <Row>
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
            text={meal ? 'Zaktualizuj' : 'Dodaj'}
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
