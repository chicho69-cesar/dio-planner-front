import React from 'react'
import { FormControl } from 'native-base'
import { useRecoilState } from 'recoil'
import { errorsState } from '../providers/login-state.js'

export default function FormElement({ children, to, label, isRequired, mb }) {
  const [errors] = useRecoilState(errorsState)

  return (
    <FormControl
      width="100%"
      alignItems="center"
      mb={mb ? mb : '6'}
      isRequired={isRequired}
      isInvalid={to in errors}
    >
      {label && (
        <FormControl.Label
          width="75%"
          ml="4"
          _text={{
            fontSize: 18,
            color: 'gray.600'
          }}
        >
          {label}
        </FormControl.Label>
      )}

      {children}
    </FormControl>
  )
}
