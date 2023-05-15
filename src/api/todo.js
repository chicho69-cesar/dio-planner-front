import axios from 'axios'

import { todoEndpoints } from '../constants/endpoints'
import { handleError } from '../utilities/handleErrors'

export const addTodo = async (text, date, complete, eventID) => {
  try {
    const { data } = await axios.post(todoEndpoints.addTodo, {
      text,
      date,
      complete,
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

export const getTodos = async (eventID) => {
  try {
    const { data } = await axios.get(`${todoEndpoints.getTodos}/${eventID}`)

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

export const updateTodo = async (todoID, text, date, complete) => {
  try {
    const { data } = await axios.patch(
      `${todoEndpoints.updateTodo}/${todoID}`,
      {
        text,
        date,
        complete
      }
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

export const deleteTodo = async (todoID) => {
  try {
    const { data } = await axios.delete(`${todoEndpoints.deleteTodo}/${todoID}`)

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
