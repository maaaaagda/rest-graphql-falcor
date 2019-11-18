import React from 'react'
import {
  FormGroup,
  InputGroup,
  Card,
  Elevation,
  ICardProps,
  Button,
} from '@blueprintjs/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { PasswordInput } from './PasswordInput'
import { connect } from 'react-redux'
import { setLoggedInUser } from 'src/actions'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
})

const mapDispatchToProps = {
  loginUser: setLoggedInUser,
}

type Props = ICardProps & typeof mapDispatchToProps

const LoginFormComponent = ({ loginUser, ...rest }: Props) => (
  <Card elevation={Elevation.TWO} {...rest}>
    <h5>Zaloguj się</h5>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={values => {
        loginUser({ id: 'foo', email: values.email })
      }}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        isSubmitting,
      }) => (
        <Form>
          <FormGroup
            label="email"
            labelFor="email"
            helperText={touched.email && errors.email}
            intent={touched.email && errors.email ? 'danger' : 'none'}>
            <InputGroup
              name="email"
              placeholder="your@email.com"
              intent={touched.email && errors.email ? 'danger' : 'none'}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <FormGroup
            label="hasło"
            labelFor="password"
            helperText={touched.password && errors.password}
            intent={touched.password && errors.password ? 'danger' : 'none'}>
            <PasswordInput
              name="password"
              value={values.password}
              intent={touched.password && errors.password ? 'danger' : 'none'}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormGroup>
          <Button
            intent="success"
            text="Zaloguj"
            type="submit"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  </Card>
)

const LoginForm = connect(
  null,
  mapDispatchToProps
)(LoginFormComponent)

export { LoginForm }
