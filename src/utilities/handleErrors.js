import axios from 'axios'

export const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.response.data.detail)
    }

    console.error(error.message)
  }
}
