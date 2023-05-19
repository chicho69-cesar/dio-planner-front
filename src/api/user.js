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
    return null
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
    return null
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
    return null
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
    return null
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
    return null
  }
}

export const getUser = async (userID) => {
  try {
    const { data } = await axios.get(`${userEndpoints.get}/${userID}`)

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
    return null
  }
}

export const updateUser = async (name, description, picture, userID) => {
  try {
    const { data } = await axios.patch(`${userEndpoints.update}/${userID}`, {
      name,
      description,
      picture
    })

    if (data) {
      console.log(data)
      return data
    }

    return null
  } catch (error) {
    handleError(error)
    return null
  }
}
