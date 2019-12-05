import React from 'react'
import styles from './MealDetails.module.scss'
import { Meal, createMeal } from 'src/models'
import { Formik, Form } from 'formik'
import { useUpdateMealMutation, useCreateMealMutation } from 'src/rest/mealMutation'
import { FormGroup, InputGroup, Button, IInputGroupProps } from '@blueprintjs/core'

export type MealDetailsProps = {
    meal?: Meal
    editable?: boolean
}

type SimpleInputProps = {
    label: string,
    name: string,
    placeholder: string,
    touched: any,
    errors: any,
    values: any,
    handleChange: any,
    handleBlur: any
} & IInputGroupProps

const SimpleInput = ({ label, name, placeholder, touched, errors, values, handleChange, handleBlur, type }: SimpleInputProps) => (
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

const MealDetails = ({ meal, editable }: MealDetailsProps) => {
    const { mutate } = meal ? useUpdateMealMutation(meal._id) : useCreateMealMutation()
    let mealValues = meal || createMeal({})
    delete mealValues["_id"]

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
                    status
                }) => (
                        <Form>
                            <SimpleInput label="nazwa" name="name" placeholder="nazwa posiłku" disabled={!editable} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                            <FormGroup
                                label="składniki"
                                labelFor="ingredients"
                                helperText={touched.ingredients && errors.ingredients}
                                intent={touched.ingredients && errors.ingredients ? 'danger' : 'none'}>
                            </FormGroup>
                            <SimpleInput label="kcal" name="kcal" placeholder="" disabled={!editable} touched={touched} errors={errors} values={values} type="number" handleChange={handleChange} handleBlur={handleBlur} />
                            <SimpleInput label="białko" name="protein" placeholder="" disabled={!editable} touched={touched} errors={errors} values={values} type="number" handleChange={handleChange} handleBlur={handleBlur} />
                            <SimpleInput label="węglowodany" name="carbohydrate" placeholder="" disabled={!editable} touched={touched} errors={errors} values={values} type="number" handleChange={handleChange} handleBlur={handleBlur} />
                            <SimpleInput label="tłuszcze" name="fat" placeholder="" disabled={!editable} touched={touched} errors={errors} values={values} type="number" handleChange={handleChange} handleBlur={handleBlur} />
                            <SimpleInput label="błonnik" name="fibre" placeholder="" disabled={!editable} touched={touched} errors={errors} values={values} type="number" handleChange={handleChange} handleBlur={handleBlur} />
                            <SimpleInput label="zdjęcie" name="photo" placeholder="http://..." disabled={!editable} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                            <Button
                                intent="success"
                                text={meal ? "Zaktualizuj" : "Dodaj"}
                                type="submit"
                                disabled={isSubmitting || !editable}
                            />
                            {status && <p className="text-danger mt-2">{status}</p>}
                        </Form>
                    )}
            </Formik>
        </div>
    )
}

export { MealDetails }
