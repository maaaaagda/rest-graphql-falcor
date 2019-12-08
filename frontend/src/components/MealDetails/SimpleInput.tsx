import React from 'react'
import { FormGroup, InputGroup, IInputGroupProps } from '@blueprintjs/core'

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

export { SimpleInput }
