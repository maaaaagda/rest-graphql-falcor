import React from 'react'
import styles from './MealDetails.module.scss'
import { Meal } from 'src/models'
import { Formik, Form } from 'formik'
import {
  useUpdateMealMutation,
  useCreateMealMutation,
} from 'src/rest/mealMutation'
import {
  FormGroup,
  InputGroup,
  Button,
  IInputGroupProps,
} from '@blueprintjs/core'
import { AppState } from 'src/store/types'
import { Row, Col } from 'react-bootstrap'
import { IngredientList } from './IngredientList'
import { connect } from 'react-redux'

const mapStateToProps = (state: AppState) => ({
  loggedInUser: state.user.loggedInUser,
})

export type MealDetailsProps = {
  meal: Meal
  editable?: boolean
} & ReturnType<typeof mapStateToProps>

type SimpleInputProps = {
  label: string
  name: string
  placeholder: string
  touched: any
  errors: any
  values: any
  handleChange: any
  handleBlur: any
} & IInputGroupProps

const SimpleInput = ({
  label,
  name,
  placeholder,
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  type,
}: SimpleInputProps) => (
  <FormGroup
    label={label}
    labelFor={name}
    helperText={touched[name] && errors[name]}
    intent={touched[name] && errors[name] ? 'danger' : 'none'}>
    <InputGroup
      name={name}
      placeholder={placeholder}
      intent={touched[name] && errors[name] ? 'danger' : 'none'}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      type={type}
    />
  </FormGroup>
)

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
    receipe: '',
    authorId: loggedInUser ? loggedInUser.id : '',
    photo: meal.photo,
  }

  return (
    <div className={styles.container}>
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
          <Form>
            <Row>
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
              <Row>
                <Col md={4} className="px-0">
                  <h1>Składniki:</h1>
                  <IngredientList
                    ingredients={values.ingredients}
                    disabled={!editable}
                    setIngredients={v => setFieldValue('ingredients', v)}
                  />
                </Col>
                <Col md={8} className="px-0">
                  <h1>Przepis:</h1>
                  <input
                    type="text"
                    name="recepie"
                    placeholder="przepis..."
                    value={values.receipe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
              </Row>
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
              <Button
                intent="success"
                text={meal ? 'Zaktualizuj' : 'Dodaj'}
                type="submit"
                disabled={isSubmitting || !editable}
              />
              {status && <p className="text-danger mt-2">{status}</p>}
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const MealDetails = connect(mapStateToProps)(MealDetailsComponent)

export { MealDetails }
