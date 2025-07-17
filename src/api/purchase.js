import axios from 'axios'

import { purchaseEndpoints } from '../constants/endpoints'
import { handleError } from '../utils/handle-errors'

export const addPurchase = async (title, price, eventID) => {
  try {
    const { data } = await axios.post(purchaseEndpoints.addPurchase, {
      title,
      price,
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

export const getPurchases = async (eventID) => {
  try {
    const { data } = await axios.get(
      `${purchaseEndpoints.getPurchases}/${eventID}`
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

export const updatePurchase = async (purchaseID, title, price) => {
  try {
    const { data } = await axios.patch(
      `${purchaseEndpoints.updatePurchase}/${purchaseID}`,
      {
        title,
        price
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

export const deletePurchase = async (purchaseID) => {
  try {
    const { data } = await axios.delete(
      `${purchaseEndpoints.deletePurchase}/${purchaseID}`
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
