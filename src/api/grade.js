import axios from 'axios'

import { gradeEndpoints } from '../constants/endpoints'
import { handleError } from '../utils/handle-errors'

export const addGrade = async (opinion, grade, eventID, userID) => {
  try {
    const { data } = await axios.post(gradeEndpoints.addGrade, {
      opinion,
      grade,
      eventID,
      userID
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

export const getGrades = async (eventID) => {
  try {
    const { data } = await axios.get(`${gradeEndpoints.getGrades}/${eventID}`)

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
