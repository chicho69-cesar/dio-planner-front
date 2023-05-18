import axios from 'axios'

import { guestEndpoints } from '../constants/endpoints'
import { handleError } from '../utilities/handleErrors'

export const addGuest = async (userID, eventID, status) => {
  try {
    const { data } = await axios.post(guestEndpoints.addGuest, {
      userID,
      eventID,
      status
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

export const searchTheGuests = async (name) => {
  try {
    const queryString = new URLSearchParams({ query: name }).toString()
    const { data } = await axios.get(
      `${guestEndpoints.searchGuests}?${queryString}`
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

export const getGuests = async (eventID) => {
  try {
    const { data } = await axios.get(`${guestEndpoints.getGuests}/${eventID}`)

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

export const getInvitations = async (userID) => {
  try {
    const { data } = await axios.get(
      `${guestEndpoints.getInvitations}/${userID}`
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

export const acceptInvitation = async (guestID) => {
  try {
    const { data } = await axios.patch(
      `${guestEndpoints.acceptInvitation}/${guestID}`
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

export const declineInvitation = async (guestID) => {
  try {
    const { data } = await axios.patch(
      `${guestEndpoints.declineInvitation}/${guestID}`
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

export const getMyEvents = async (userID) => {
  try {
    const { data } = await axios.get(`${guestEndpoints.getMyEvents}/${userID}`)

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
