import React, { useState } from 'react'
import {
  InputGroup,
  Tooltip,
  Button,
  Intent,
  IInputGroupProps,
  HTMLInputProps,
} from '@blueprintjs/core'

type Props = IInputGroupProps & HTMLInputProps

const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>()

  const toggleShowPassword = () => setShowPassword(!showPassword)

  const lockButton = (
    <Tooltip content={`${showPassword ? 'Ukryj' : 'Pokaż'} hasło`}>
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        intent={Intent.WARNING}
        minimal={true}
        onClick={toggleShowPassword}
      />
    </Tooltip>
  )

  return (
    <InputGroup
      {...props}
      rightElement={lockButton}
      type={showPassword ? 'text' : 'password'}
    />
  )
}

export { PasswordInput }
