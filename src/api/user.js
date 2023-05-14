import axios from 'axios'

import { userEndpoints } from '../constants/endpoints'
import { handleError } from '../utilities/handleErrors'

export const registerUser = async (name, email, password) => {
  try {
    const { data } = await axios.post(userEndpoints.register, {
      name,
      email,
      password
    })

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
  }
}

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(userEndpoints.login, {
      email,
      password
    })

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
  }
}

export const facebookLoginOrRegisterUser = async (accessToken) => {
  try {
    const { data } = await axios.post(userEndpoints.facebook, {
      accessToken
    })

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
  }
}

export const googleLoginOrRegisterUser = async (accessToken) => {
  try {
    const { data } = await axios.post(userEndpoints.google, {
      accessToken
    })

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
  }
}

export const appleLoginOrRegisterUser = async (identityToken) => {
  try {
    const { data } = await axios.post(userEndpoints.apple, {
      identityToken
    })

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
  }
}

export const updateUser = async (name, password, description, picture) => {
  //
}
