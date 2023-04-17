import React from 'react'
import { FormControl } from 'native-base'
import { useRecoilState } from 'recoil'

import { errorsCreateEventState } from '../../providers/event-state'

export default function FormWrapper({ children, to, isRequired }) {
  const [errors, setErrors] = useRecoilState(errorsCreateEventState)

  return (
    <FormControl
      width="100%"
      alignItems="center"
      mt="3"
      mb="3"
      isRequired={isRequired}
      isInvalid={to in errors}
    >
      {children}
    </FormControl>
  )
}
