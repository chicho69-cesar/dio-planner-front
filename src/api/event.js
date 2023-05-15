import axios from 'axios'

import { eventEndpoints } from '../constants/endpoints'
import { handleError } from '../utilities/handleErrors'

export const createEvent = async (
  name,
  date,
  description,
  img,
  location,
  user_id
) => {
  try {
    const { data } = await axios.post(eventEndpoints.create, {
      name,
      date,
      description,
      img,
      location,
      user_id
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

export const getUserEvents = async (userID) => {
  try {
    const { data } = await axios.get(
      `${eventEndpoints.getUserEvents}/${userID}`
    )

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
