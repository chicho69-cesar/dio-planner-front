import { FormControl } from 'native-base'
import React from 'react'
import { useRecoilState } from 'recoil'

import { errorsEditInfoState } from '../../providers/edit-info-state'

export default function FormWrapper({ children, to, isRequired }) {
  const [errors] = useRecoilState(errorsEditInfoState)

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
