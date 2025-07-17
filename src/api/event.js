import axios from 'axios'

import { eventEndpoints } from '../constants/endpoints'
import { handleError } from '../utils/handle-errors'

export const createEvent = async (
  name,
  date,
  description,
  img,
  location,
  topic,
  accessibility,
  user_id
) => {
  try {
    const { data } = await axios.post(eventEndpoints.create, {
      name,
      date,
      description,
      img,
      location,
      topic,
      accessibility,
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

export const getTopEvents = async () => {
  try {
    const { data } = await axios.get(`${eventEndpoints.getTopEvents}`)

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

export const getEventsByQuery = async (name, location) => {
  try {
    const queryString = new URLSearchParams({
      name: name,
      location: location
    }).toString()
    const { data } = await axios.get(
      `${eventEndpoints.getQueryEvents}?${queryString}`
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
