import axios from 'axios'

import { memoryEndpoints } from '../constants/endpoints'
import { handleError } from '../utils/handle-errors'

export const getMemories = async (eventID, page) => {
  try {
    const { data } = await axios.get(
      `${memoryEndpoints.getMemories}/${eventID}/${page}`
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

export const getAllMemories = async (eventID) => {
  try {
    const { data } = await axios.get(
      `${memoryEndpoints.getMemories}/${eventID}`
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

export const shareMemory = async (title, picture, eventID) => {
  try {
    const { data } = await axios.post(memoryEndpoints.shareMemory, {
      title,
      picture,
      eventID
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
