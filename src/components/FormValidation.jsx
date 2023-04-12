import React from 'react'
import { FormControl, WarningOutlineIcon } from 'native-base'
import { useRecoilState } from 'recoil'
import { errorsState } from '../providers/login-state.js'

export default function FormValidation({ to }) {
  const [errors] = useRecoilState(errorsState)

  return `${to}` in errors ? (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {errors[`${to}`]}
    </FormControl.ErrorMessage>
  ) : (
    <></>
  )
}
